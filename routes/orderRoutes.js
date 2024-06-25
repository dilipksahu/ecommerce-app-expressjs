const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/orders (Create a new order)
router.post('/', authMiddleware.authenticateToken, orderController.createOrder);

// GET /api/orders/:orderId (Get all orders)
router.get('/', orderController.getAllOrders);

// GET /api/orders/:orderId (Get a order by ID)
router.get('/:orderId', orderController.getOrderById);

module.exports = router;