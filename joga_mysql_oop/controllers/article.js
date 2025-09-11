
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

}

export const articleController = new ArticleController();