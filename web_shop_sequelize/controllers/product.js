const Product = require('../models/product');

class productController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            console.log(products);
            res.status(201).json({
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
};

module.exports = new productController();