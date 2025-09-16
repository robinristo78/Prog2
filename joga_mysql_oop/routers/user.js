import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.post('/users/register', (req, res) => userController.register(req, res));

export default router;