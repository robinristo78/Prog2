const dotenv = require('dotenv');
dotenv.config();
// Import sequelize library and connect to the database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

const getAllArticles = (req, res) => {
    Article.findAll()
        .then(articles => {
            console.log(articles);
            return res.status(200).json(articles);
        })
        .catch (error => {
            return res.status(500).send(error.message);
        });
}

module.exports = {
    getAllArticles
};