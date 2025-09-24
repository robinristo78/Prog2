const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


const dotenv = require('dotenv');
dotenv.config();
// Import sequelize library and connect to the database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Test the database connection
sequelize.authenticate().then(() => {
   console.log('Connected to the database.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// app.get('/', (req, res) => {
//     res.json({ message: 'Hello, World!' });
// });

const articleRouter = require('./routes/article');
app.use('/', articleRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});