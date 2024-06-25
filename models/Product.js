const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: new Date()}
});

module.exports = mongoose.model('Product', productSchema);