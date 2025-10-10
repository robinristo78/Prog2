const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post("/orders/create", (req, res) => orderController.createOrder(req, res));

router.get("/orders", (req, res) => orderController.getOrders(req, res));

module.exports = router;