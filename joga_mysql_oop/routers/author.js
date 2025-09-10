import express from 'express';
import { authorController } from '../controllers/author.js';

const router = express.Router();

// Route to get all authors
// get author by id and his articles
router.get('/author/:author_id', (req, res) => authorController.getAuthorById(req, res));

export default router;