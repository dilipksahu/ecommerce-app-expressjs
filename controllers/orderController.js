const orderService = require('../services/orderService');

class OrderController {

    // Create a new order
    createOrder = async (req, res) => {
        try {
            const newOrder = await orderService.createOrder(req.user._id,req.body.products);
            res.status(201).json(newOrder);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

}

module.exports = new OrderController();