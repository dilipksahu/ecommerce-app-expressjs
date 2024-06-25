const productService = require('../services/productService');

class ProductController {
    // Create a new product
    createProduct = async (req, res) => {
        try {
            const newProduct = await productService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

     // Get all products sorted by created_at
     getAllProduct = async (req, res) => {
        try {
            const product = await productService.getAllProduct();
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };


    // Get a product by ID
    getProductById = async (req, res) => {
        try {
            const product = await productService.getProductById(req.params.productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Update a product by ID
    updateProductById = async (req, res) => {
        try {
            const updatedProduct = await productService.updateProductById(req.params.productId, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

    // Delete a product by ID
    deleteProductById = async (req, res) => {
        try {
            const deletedProduct = await productService.deleteProductById(req.params.productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

}

module.exports = new ProductController();