const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const axios = require('axios');

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

    async getAllOrders() {
        try {
            const orders = await Order.find().populate('userId').populate('products.productId');
            return orders;
        } catch (error) {
            throw new Error(`Error fetching orders: ${error.message}`);
        }
    }

    // Get order by ID
    async getOrderById(orderId) {
        try {
            const order = await Order.findById(orderId).populate('userId').populate('products.productId');
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        } catch (error) {
            throw new Error(`Error fetching order: ${error.message}`);
        }
    }

     // Update order by ID
     async updateOrderById(orderId, updateData) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found');
            }

            if (updateData.products) {
                let totalAmount = 0;
                for (let product of updateData.products) {
                    const productDetails = await Product.findById(product.productId);
                    if (!productDetails) {
                        throw new Error(`Product with id ${product.productId} not found`);
                    }
                    totalAmount += productDetails.price * product.quantity;
                }
                order.products = updateData.products;
                order.totalAmount = totalAmount;
            }

            if (updateData.userId) {
                const user = await User.findById(updateData.userId);
                if (!user) {
                    throw new Error('User not found');
                }
                order.userId = updateData.userId;
            }

            await order.save();
            return order;
        } catch (error) {
            throw new Error(`Error updating order: ${error.message}`);
        }
    }

    // Delete order by ID
    async deleteOrderById(orderId) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            await order.remove();
            return order;
        } catch (error) {
            throw new Error(`Error deleting order: ${error.message}`);
        }
    }

    async processPayment(paymentDetails) {
        const response = await axios.post('https://api.stripe.com/v1/charges', paymentDetails);
        return response.data;
    }
      
    async createShipment(shipmentDetails) {
        const response = await axios.post('https://api.logistics.com/v1/shipments', shipmentDetails);
        return response.data;
    }
}

module.exports = new OrderService();
