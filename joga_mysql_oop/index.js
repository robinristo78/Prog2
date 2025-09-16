

import express from 'express';
import session from 'express-session';

import articleRouter from './routers/article.js';
import authorRouter from './routers/author.js';
import userRouter from './routers/user.js';


const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    resave: false
}))

// Use the article router for routes starting with /articles
app.use('/', articleRouter);

app.use('/', authorRouter);

app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});