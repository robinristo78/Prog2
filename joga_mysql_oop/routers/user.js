import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.post('/users/register', (req, res) => userController.register(req, res));

router.post('/users/login', (req, res) => userController.login(req, res));

export default router;