const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

class OrderService {

    async createOrder(userId, products) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Validate products and calculate total amount
            let totalAmount = 0;
            for (let product of products) {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) {
                    throw new Error(`Product with id ${product.productId} not found`);
                }
                totalAmount += productDetails.price * product.quantity;
            }

            const order = new Order({
                userId: userId,
                products: products,
                totalAmount: totalAmount
            });

            await order.save();
            return order;
        } catch (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
    }

   

}

module.exports = new OrderService();
