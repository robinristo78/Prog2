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

};

const updateArticle = async (req, res) => {
    const articleId = req.params.id;

    if (req.method === 'GET') {
        try {
            const article = await models.Article.findByPk(articleId);
            if (!article) {
                return res.status(200).json({ message: 'Article not found' });
            }

            const authors = await models.Authors.findAll();

            res.render('editArticle', { article, authors });
            // res.json({ article, authors });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    } else if (req.method === 'POST') {
        try {
            const { name, body, authorId } = req.body;

            const [updated] = await models.Article.update(
                { name, body, author_id: authorId },
                { where: { id: articleId } }
            );

            if (updated) {
                res.json({ message: 'Article updated successfully' });
            } else {
                res.status(404).json({ message: 'Article not found' });
            }
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
};

const deleteArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        // Kustuta artikkel vastava ID-ga
        const deleted = await models.Article.destroy({ where: { id: articleId } });

        if (deleted) {
            res.json({ message: 'Article deleted successfully' });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
};