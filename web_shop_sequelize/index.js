const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require('./util/db');

const models = require('./models/index');
sequelize.models = models;

app.use(async (req, res, next) => {
    try {
        let user = await models.User.findByPk(1);
        if (!user) {
            user = await models.User.create({ name: 'user', email: 'user@local.com' });
            await user.createCart();
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to initialize user' });
    }
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
        console.log('Sequelize loaded.');
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