const dotenv = require('dotenv');
dotenv.config();
// Import sequelize library and connect to the database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const models = require('../models');

// Controller to get articles by author ID
const getArticlesByAuthorId = async (req, res) => {
  const { authorId } = req.params;
  try {
    const author = await models.Authors.findByPk(authorId, {
      include: [{
        model: models.Article,
        as: 'articles',
        attributes: ['id', 'name', 'slug', 'image', 'body']
      }]
    });

    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    console.error('Error fetching articles by author ID:', error);
    res.status(500).json({ error: 'Failed to fetch articles by author ID' });
  }
};

module.exports = {
  getArticlesByAuthorId,
};
