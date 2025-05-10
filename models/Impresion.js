const mongoose = require('mongoose');

const impresionSchema = new mongoose.Schema({
    impresionName: String,
    impresionSize: String,
    impresionPrice: Number,
    impresionQuantity: Number
});

module.exports = mongoose.model('Impresion', impresionSchema);
