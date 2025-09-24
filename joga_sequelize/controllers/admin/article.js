const dotenv = require('dotenv');
dotenv.config();
// Import sequelize library and connect to the database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const models = require('../../models');

const createArticle = async (req, res) => {
    let name = req.body.name;
    let slug = req.body.slug;
    let image = req.body.image;
    let body = req.body.body;

    const newArticle = models.Article.create({
        name: name,
        slug: slug,
        image: image,
        body: body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
    })
    .then(article => {
        console.log(article);
        return res.status(201).json({ message: 'new article is added' });
    })
    .catch (error => {
        return res.status(500).send(error.message);
    });

}

module.exports = {
    createArticle
};