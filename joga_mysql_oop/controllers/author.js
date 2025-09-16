import ArticleDbModel from '../models/article.js';
import AuthorDbModel from '../models/author.js';
const authorModel = new AuthorDbModel();
const articleModel = new ArticleDbModel();

class AuthorController {
    // Get authors by id
    async getAuthorById(req, res) {
        try {

            const author = await authorModel.findById(req.params.author_id);
            if (!author) {
                return res.status(404).json({ error: 'Author not found' });
            }
            const articles = await articleModel.findMany(author);
            author.articles = articles;
            res.status(201).json(author);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new AuthorController();