const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.js');

router.get('/', articleController.getAllArticles);

module.exports = router;