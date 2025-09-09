

import express from 'express';
import db from './utils/db.js';
import articleRouter from './routers/article.js';

const app = express();
const PORT = 3000;
app.use(express.json());

// Use the article router for routes starting with /articles
app.use('/', articleRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});