

import express from 'express';
import db from './utils/db.js';
import articleRouter from './routers/article.js';
import authorRouter from './routers/author.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;

// Use the article router for routes starting with /articles
app.use('/', articleRouter);

app.use('/', authorRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});