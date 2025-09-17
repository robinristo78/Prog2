import express from 'express';
import session from 'express-session';

import articleRouter from './routers/article.js';
import authorRouter from './routers/author.js';
import userRouter from './routers/user.js';
import adminArticleRouter from './routers/admin/article.js';

import path from 'path';
import hbs from 'express-handlebars';

const app = express();
const PORT = 3000;

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    resave: false
}))

// Set up Handlebars view engine
app.set('views', path.resolve() + '/views/');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.resolve() + '/views/layouts/',
}));

app.use(express.static('public'));

// Import database utility
import db from './utils/db.js';

//render hbs webpage
app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    db.query(query, (err, results) => {
        if (err) throw err;
        articles = results;
        res.render('index', { articles: articles });
    });
});

//render article page
app.get('/article/:slug', (req, res) => {
    let query = `SELECT * FROM article WHERE slug = "${req.params.slug}"`;
    let article;
    db.query(query, (err, results) => {
        if (err) throw err;
        article = results[0];
        res.render('article', { article: article });
    });
});

// Use the article router for routes starting with /articles
app.use('/', articleRouter);

app.use('/', authorRouter);

app.use('/', userRouter);

app.use('/admin', adminArticleRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});