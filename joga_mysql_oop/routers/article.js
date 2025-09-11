import express from 'express';
import { articleController } from '../controllers/article.js';

const router = express.Router();

// Route to get all articles
router.get('/', (req, res) => {
    articleController.getAllArticles(req, res)
});

router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));

// Post create new article
router.post('/article/create', (req, res) => {
    articleController.createNewArticle(req, res)
});

// Post edit article
router.post('/article/edit/:id', (req, res) => {
    articleController.updateArticle(req, res)
});

export default router;