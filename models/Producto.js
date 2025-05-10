const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productQuantity: Number
});

module.exports = mongoose.model('Producto', productoSchema);
