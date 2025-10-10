const Order = require("./../models/order");
const OrderItem = require("./../models/order-item");
const Product = require("./../models/product");

class orderController {
    // Vormista tellimus
    async createOrder(req, res) {
        try {
            const userCart = await req.user.getCart();
            const cartProducts = await userCart.getProducts();

            if (!cartProducts.length) {
                return res.status(400).json({ error: "Cart is empty" });
            }

            const order = await req.user.createOrder();
            for (const product of cartProducts) {
                await order.addProduct(product, { through: { quantity: product.cartItem.quantity } });
            }

            await userCart.setProducts([]);

            res.status(201).json({ message: "Order created successfully", orderId: order.id });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

  // Kuva kasutaja tellimused
  async getOrders(req, res) {
    try {
      const orders = await req.user.getOrders({ include: [Product] });
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new orderController;