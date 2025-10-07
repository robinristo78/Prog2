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
}

module.exports = new productController();