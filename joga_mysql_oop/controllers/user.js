import bcrypt from 'bcrypt';

import UserDbModel from '../models/user.js';

const userModel = new UserDbModel();

class UserController {

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
        const existingUser = await userModel.findUser(req.body.username);

        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const registeredId = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: cryptPassword
        });

        if (registeredId) {
            const userData = await userModel.findById(registeredId);
            req.session.user = {
                username: userData.username,
                user_id: userData.id
            };
            res.json({
                message: "New user is registered",
                user_session: req.session.user
            })
        }
    }
}

export default new UserController();