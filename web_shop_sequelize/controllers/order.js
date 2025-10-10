const Order = require("./../models/order");
const OrderItem = require("./../models/order-item");
const product = require("./product");

class orderController {
    async createOrder(req, res) {
        try {
            const userCart = await req.user.getCart();
            const cartProducts = await userCart.getProducts();

            if (cartProducts.length === 0) {
                return res.status(400).json({ error: "Cart is empty" });
            }

            const order = await req.user.createOrder();
            await order.addProducts(cartProducts.map(product => {
                return { ...product.dataValues, orderItem: { quantity: product.cartItem.quantity }};
            }));

            await userCart.setProducts([]);

            res.status(200).json({ message: "Order placed successfully" });
        } catch (error) {
            console.error("Error creating order: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getOrder(req, res) {
        try {
            const orders = await req.user.getOrders({ include: [product] });
            res.status(200).json({ orders });
        } catch (error) {
            console.error("Error fetching orders: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new orderController;