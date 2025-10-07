const Product = require('../../models/product');

class adminController {

    async addProduct(req, res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            userId: req.user.id
        });
        res.status(201).json({
            message: 'Product created successfully',
            productId: product.id,
        });
    }

    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json({
                products: products
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.productId;
            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.status(200).json({ product: product });
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.productId;
            const { title, price, imageUrl, description } = req.body;

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            product.title = title;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            await product.save();

            res.status(200).json({ message: 'Product updated successfully', product: product });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.productId;

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            await product.destroy();
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new adminController();