
import express from 'express';
import { articleController } from '../controllers/article.js';

const router = express.Router();

// Route to get all articles
router.get('/', (req, res) => {
    articleController.getAllArticles(req, res)
});

export default router;