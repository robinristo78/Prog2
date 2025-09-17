    import ArticleDbModel from '../../models/article.js';
    const articleModel = new ArticleDbModel();

    class AdminArticleController {
    async getAllArticles(req, res) {
        try {
        const articles = await articleModel.findAll();
        res.render('admin/view', { articles });
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    async getArticleBySlug(req, res) {
        try {
        const article = await articleModel.findOne(req.params.slug);
        res.render('admin/article', { article });
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    async createNewArticle(req, res) {
        try {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id,
        };

        const insertId = await articleModel.create(newArticle);

        res.redirect(`/admin`);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    async getEditArticle(req, res) {
        try {
        const articleId = req.params.id;
        const article = await articleModel.findById(articleId);
        if (!article) return res.status(404).send("Article not found");

        res.render('admin/edit', { article });
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    async updateArticle(req, res) {
        try {
        const articleId = req.params.id;
        const updatedArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            author_id: req.body.author_id,
        };

        await articleModel.update(articleId, updatedArticle);

        res.redirect(`/admin`);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
  }

    async deleteArticle(req, res) {
        try {
        const articleId = req.params.id;
        await articleModel.delete(articleId);
        res.redirect('/admin');
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }
    }

    export default new AdminArticleController();