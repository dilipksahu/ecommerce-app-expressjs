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

// PUT /api/orders/:orderId (Update a order by ID)
router.put('/:orderId', authMiddleware.authenticateToken, orderController.updateOrderById);

// DELETE /api/orders/:orderId (Delete a order by ID)
router.delete('/:orderId', authMiddleware.authenticateToken, orderController.deleteOrderById);

module.exports = router;