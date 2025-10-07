const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const productAdminRoutes = require('./routes/admin/products');
app.use('/admin', productAdminRoutes);

const productRoutes = require('./routes/products');
app.use(productRoutes);

const sequelize = require('./util/db');

const models = require('./models/index');
sequelize.models = models;

sequelize
    .sync()
    .then(() => {
        console.log('Tabelid on loodud.');
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