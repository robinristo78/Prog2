import express from 'express';
import adminArticleController from '../../controllers/admin/article.js';
const router = express.Router();

// Get all articles (admin list)
router.get('/', (req, res) => adminArticleController.getAllArticles(req, res));

// Create form
router.get('/article/create', (req, res) => res.render('admin/create'));

// Create new article
router.post('/article/create', (req, res) => adminArticleController.createNewArticle(req, res));

// View single article (admin detail)
router.get('/article/:slug', (req, res) => adminArticleController.getArticleBySlug(req, res));

router.get('/article/edit/:id', (req, res) => adminArticleController.getEditArticle(req, res));

// Update article (better: use id)
router.post('/article/edit/:id', (req, res) => adminArticleController.updateArticle(req, res));

// Delete article (use POST since no method override)
router.post('/article/delete/:id', (req, res) => adminArticleController.deleteArticle(req, res));

export default router;