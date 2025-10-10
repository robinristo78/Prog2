const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

// get Cart
router.get('/cart', (req, res) => shopController.getCart(req, res));

// post add a product to Cart
router.post("/cart/add/:productId", (req, res) => shopController.addToCart(req, res));

// post remove a product from Cart
router.post("/cart/remove/:productId", (req, res) => shopController.removeFromCart(req, res));

module.exports = router;