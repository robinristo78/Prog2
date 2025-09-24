const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authors');

// Route to get articles by author ID
router.get('/author/:authorId', authorController.getArticlesByAuthorId);

module.exports = router;
