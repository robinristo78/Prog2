const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.js');
const adminArticleController = require('../controllers/admin/article.js');

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

router.post('/admin/article/create', adminArticleController.createArticle);

router.get('/admin/article/edit/:id', adminArticleController.updateArticle);
router.post('/admin/article/edit/:id', adminArticleController.updateArticle);

module.exports = router;