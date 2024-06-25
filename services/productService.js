const Product = require('../models/Product');

class ProductService {
   
    async createProduct(productData) {
        const newProduct = new Product(productData);
        return newProduct.save();
    }

    async getAllProduct() {
        return Product.find().sort({created_at: -1}).lean();
    }

    async getProductById(productId) {
        return await Product.findById(productId);
    }

    async updateProductById(productId, updateData) {
        return await Product.findByIdAndUpdate(productId, updateData, { new: true });
    }

    async deleteProductById(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

module.exports = new ProductService();
