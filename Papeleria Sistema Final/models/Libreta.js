// Asegúrate de importar mongoose
const mongoose = require('mongoose');

const libretaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true, default: "A4" }, // Tamaño por defecto
});

const Libreta = mongoose.model('Libreta', libretaSchema);

module.exports = Libreta;
