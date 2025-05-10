const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Importar path para manejar rutas
const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use(cors());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos desde la carpeta 'public'

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Papeleria')
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB', err));

// Modelos de Mongoose
const libretaSchema = new mongoose.Schema({
    productName: String,
    productSize: String,
    productPrice: Number,
    productQuantity: Number
});

const impresionSchema = new mongoose.Schema({
    productName: String,
    paperSize: String,
    productPrice: Number,
    productQuantity: Number
});

const productoSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productQuantity: Number
});

const Libreta = mongoose.model('Libreta', libretaSchema);
const Impresion = mongoose.model('Impresion', impresionSchema);
const Producto = mongoose.model('Producto', productoSchema);

// Rutas para guardar productos
app.post('/guardar-libretas', async (req, res) => {
    const { name, price, quantity, size } = req.body;
    const newLibreta = new Libreta({
        productName: name,
        productSize: size,
        productPrice: parseFloat(price),
        productQuantity: parseInt(quantity, 10)
    });

    try {
        await newLibreta.save();
        res.status(200).json({ message: 'Libreta guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar libreta:', error);
        res.status(500).json({ error: 'Error al guardar la libreta' });
    }
});

app.post('/guardar-impresion', async (req, res) => {
    try {
        const nuevaImpresion = {
            nombre: req.body.nombre,
            tamano_papel: req.body.tamano_papel,
            precio: req.body.precio,
            cantidad: req.body.cantidad
        };

        const db = nano.db.use('Papeleria'); // Asegúrate de que este es el nombre correcto de tu BD
        const respuesta = await db.insert(nuevaImpresion);
        res.json({ mensaje: "Impresión guardada correctamente", id: respuesta.id });
    } catch (error) {
        console.error("Error al guardar impresión:", error);
        res.status(500).json({ error: "Error al guardar la impresión" });
    }
});


app.post('/guardar-productos', async (req, res) => {
    const { name, price, quantity } = req.body;
    const newProducto = new Producto({
        productName: name,
        productPrice: parseFloat(price),
        productQuantity: parseInt(quantity, 10)
    });

    try {
        await newProducto.save();
        res.status(200).json({ message: 'Producto guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar producto:', error);
        res.status(500).json({ error: 'Error al guardar el producto' });
    }
});

// Ruta raíz para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
