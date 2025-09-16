import bcrypt from 'bcrypt';

import UserDbModel from '../models/user.js';

const userModel = new UserDbModel();

class UserController {

    // Register new user
    async register(req, res) {
        //check if password length is not empty and is at least 6 characters long
        if (req.body.password.length < 6) {
            return res.status(400).json({ message: "Password cannot be empty or be shorter than 6 characters" });
        }
        //check if password contains spaces
        if (/\s/.test(req.body.password)) {
            return res.status(400).json({ message: "Password cannot contain spaces" });
        }
        const cryptPassword = await bcrypt.hash(req.body.password, 10);
        
        //query database to check if the username is already registered
        const existingUser = await userModel.findOne(req.body.username);

        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // users table changes: ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user';

        const registeredId = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: cryptPassword,
            role: req.body.role || 'user'
        });

        if (registeredId) {
            const userData = await userModel.findById(registeredId);
            req.session.user = {
                username: userData.username,
                user_id: userData.id,
                role: userData.role
            };
            res.json({
                message: "New user is registered",
                user_session: req.session.user
            })
        }
    }

    // Login user
    async login(req, res) {
        const userData = await userModel.findOne(req.body.username);
        if (!userData) {
            return res.status(400).json({ message: "Invalid username" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        req.session.user = {
            username: userData.username,
            user_id: userData.id,
            role: userData.role
        };

        res.json({
            message: "User logged in",
            user_session: req.session.user
        });
    }
}

export default new UserController();