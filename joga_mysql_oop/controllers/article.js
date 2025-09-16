
import ArticleDbModel from '../models/article.js';
import AuthorModel from '../models/author.js';
const authorModel = new AuthorModel();
const articleModel = new ArticleDbModel();

class ArticleController {
    // Get all articles
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.status(201).json({articles: articles});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug);
        res.status(201).json({article: article});
    } 

    async createNewArticle(req, res) {
        try {
            // console.log(req.body);
            const newArticle = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
                author_id: req.body.author_id
            };

            // console.log(newArticle);

            const insertId = await articleModel.create(newArticle);

            
            res.status(201).json({article: {id: req.body.author_id, ...newArticle}});

            // res.status(201).json({newArticleId: newArticleId});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            // console.log(req.body);
            const updatedArticle = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                author_id: req.body.author_id
            };

            const affectedRows = await articleModel.update(articleId, updatedArticle);

            res.status(201).json({updatedArticle: {id: articleId, ...updatedArticle}});


            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        };

        async deleteArticle(req, res) {
            try {
                const articleId = req.params.id;
                const affectedRows = await articleModel.delete(articleId);
                res.status(201).json({message: `Article with id ${articleId} deleted successfully.`});
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        };

}

export default new ArticleController();