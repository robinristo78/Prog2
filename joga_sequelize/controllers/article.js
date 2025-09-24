const dotenv = require('dotenv');
dotenv.config();
// Import sequelize library and connect to the database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const models = require('../models');

const getAllArticles = async (req, res) => {
    await models.Article.findAll()
        .then(articles => {
            console.log(articles);
            return res.status(200).json(articles);
        })
        .catch (error => {
            return res.status(500).send(error.message);
        });
}

const getArticleBySlug = async (req, res) => {
    await models.Article.findOne({ 
        where: { 
            slug: req.params.slug 
        },
        include: [
            {
            model: models.Authors
           },
           {
            model: models.Tags,
            through: { model: models.ArticleTags }
           }
        ],
    })
    .then(article => {
        console.log(article);
        return res.status(200).json(article);
    })
    .catch (error => {
        return res.status(500).send(error.message);
    });
}

module.exports = {
    getAllArticles,
    getArticleBySlug
};