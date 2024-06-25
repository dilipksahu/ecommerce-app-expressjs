const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/products (Create a new product)
router.post('/', authMiddleware.authenticateToken, productController.createProduct);

// GET /api/products/:productId (Get all products)
router.get('/', productController.getAllProduct);

// GET /api/products/:productId (Get a product by ID)
router.get('/:productId', productController.getProductById);

// PUT /api/products/:productId (Update a product by ID)
router.put('/:productId', authMiddleware.authenticateToken, productController.updateProductById);

// DELETE /api/products/:productId (Delete a product by ID)
router.delete('/:productId', authMiddleware.authenticateToken, productController.deleteProductById);

module.exports = router;
