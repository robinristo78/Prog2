const Product = require('../models/product');
const Cart = require('../models/cart');

class shopController {
    
    async getAllProducts(req, res) {
        const products = await Product.findAll();
        console.log(products);
        res.status(200).json({
            products: products
        });
    }

    async getCart(req, res) {
        const userCart = await req.user.getCart();
        console.log(userCart);
        const cartProducts = await userCart.getProducts();
        res.status(201).json({
            products: cartProducts
        });
    }

    async addToCart(req, res) {
        try {
            const productId = req.params.productId; //req.body.productId
            const userCart = await req.user.getCart();
            const products = await userCart.getProducts({ where: { id: productId } });
            let product;
            if (products.length > 0) {
                product = products[0];
                let quantity = product.cartItem.quantity;
                await product.cartItem.update({ quantity: quantity + 1});
            } else {
                product = await Product.findByPk(productId);
                if (!product) return res.status(404).json({ error: "Product not found" });
                await userCart.addProduct(product, { through: { quantity: 1 } });
            }
            res.status(200).json({ message: "Product added to cart successfully" });
        } catch (error) {
            console.log("Error adding product to cart: ", error)
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async removeFromCart(req, res) {
        try {
            const productId = req.params.productId; //req.body.productId
            const userCart = await req.user.getCart();

            if (!userCart) {
                return res.status(404).json({ error: "Cart not found" });
            }

            const products = await userCart.getProducts({ where: { id: productId } });
            if (products.length === 0) {
                return res.status(404).json({ error: "Product not in cart" });
            }
            const product = products[0];

            if (product.cartItem.quantity > 1) {
                await product.cartItem.update({ quantity: product.cartItem.quantity - 1 });
            } else {
                await userCart.removeProduct(product);
            }

            res.status(200).json({ message: "Product removed from cart successfully" });
        } catch (error) {
            console.log("Error removing product from cart: ", error)
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new shopController();