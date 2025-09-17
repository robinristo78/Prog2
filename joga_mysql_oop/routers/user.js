import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.get('/users', (req, res) => { userController.getAllUsers(req, res) });

router.post('/users/register', (req, res) => userController.register(req, res));

router.post('/users/login', (req, res) => userController.login(req, res));

// "wololo" - convert a user's role into admin or user. Checks their current role and changes it to the other one.
router.post('/users/wololo', (req, res) => userController.wololo(req, res));

//using hardcoded user1/qwerty for easy testing username: user1 and password: qwerty
router.get('/users/user1/qwerty', (req, res) => userController.user1Login(req, res));

export default router;