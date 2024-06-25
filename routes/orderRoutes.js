const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/order (Create a new order)
router.post('/', authMiddleware.authenticateToken, orderController.createOrder);

module.exports = router;