
import ArticleDbModel from '../models/article.js';
const articleModel = new ArticleDbModel();

class ArticleController {
    // Get all articles
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.status(201).json({articles: articles});
        } catch (error) {
            res.status(500).json({ error: err.message });
        }
    }

}

export const articleController = new ArticleController();