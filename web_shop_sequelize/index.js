const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require('./util/db');

const models = require('./models/index');
sequelize.models = models;

app.use((req, res, next) => {
    models.User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.error(err));
});

const productAdminRoutes = require('./routes/admin/products');
app.use('/admin', productAdminRoutes);

const productRoutes = require('./routes/products');
app.use(productRoutes);

const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

const orderRoutes = require('./routes/orders');
app.use(orderRoutes);

sequelize
    .sync({ force: true })
    .then(() => {
        return models.User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return models.User.create({ name: 'user', email: 'user@local.com'});
        }
        return user;
    })
    .then((user) => {
        return user.createCart();
    })
    .then((cart) => {
        console.log(cart);
        app.listen(PORT);
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// app.get('/', (req, res) => {
//     res.json({ message: 'Welcome to the Web Shop app' });
// });



// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}.`);
// });