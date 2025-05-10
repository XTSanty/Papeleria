const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// API Key para proteger las rutas
const API_KEY = 'papeleria123';

// Middleware para verificar la API Key
const verificarApiKey = (req, res, next) => {
    const apiKey = req.headers['api-key']; // Obtener la API Key del header

    if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({ error: 'API Key no válida o faltante' });
    }

    next(); // Si la API Key es válida, continuar con la siguiente función
};

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Middleware para recibir JSON
app.use(express.json());

// Middleware para permitir CORS (solicitudes desde el frontend)
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Papeleria')
    .then(() => console.log('📌 Conectado a MongoDB Ventas mostrandose Abajo ⬇️'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Modelos de Mongoose
const libretaSchema = new mongoose.Schema({
    productName: String,
    productSize: String,
    productPrice: Number,
    productQuantity: Number
});

const Libreta = mongoose.model('Libreta', libretaSchema);

// Ruta para guardar libretas (protegida por API Key)
app.post('/guardar-libretas', verificarApiKey, async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Depuración

        const { name, size, price, quantity } = req.body;

        // Validación de datos
        if (!name || !size || !price || !quantity) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Crear una nueva libreta
        const newLibreta = new Libreta({
            productName: name,
            productSize: size,
            productPrice: parseFloat(price),
            productQuantity: parseInt(quantity, 10)
        });

        // Guardar en la base de datos
        await newLibreta.save();

        // Respuesta exitosa
        res.status(200).json({ message: 'Libreta guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar libreta:', error); // Depuración
        res.status(500).json({ error: 'Error al guardar la libreta' });
    }
});
// Modelo de Impresión
const impresionSchema = new mongoose.Schema({
    productName: String,
    paperSize: String,
    productPrice: Number,
    productQuantity: Number
});

const Impresion = mongoose.model('Impresion', impresionSchema);

// Ruta para guardar impresiones (protegida por API Key)
app.post('/guardar-impresiones', verificarApiKey, async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Depuración

        const { name, size, price, quantity } = req.body;

        // Validación de datos
        if (!name || !size || !price || !quantity) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Crear una nueva impresión
        const newImpresion = new Impresion({
            productName: name,
            paperSize: size,
            productPrice: parseFloat(price),
            productQuantity: parseInt(quantity, 10)
        });

        // Guardar en la base de datos
        await newImpresion.save();

        // Respuesta exitosa
        res.status(200).json({ message: 'Impresión guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar impresión:', error); // Depuración
        res.status(500).json({ error: 'Error al guardar la impresión' });
    }
});

// Modelo de Producto
const productoSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productQuantity: Number
});

const Producto = mongoose.model('Producto', productoSchema);

// Ruta para guardar productos (protegida por API Key)
app.post('/guardar-productos', verificarApiKey, async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Depuración

        const { name, price, quantity } = req.body;

        // Validación de datos
        if (!name || !price || !quantity) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Crear un nuevo producto
        const newProducto = new Producto({
            productName: name,
            productPrice: parseFloat(price),
            productQuantity: parseInt(quantity, 10)
        });

        // Guardar en la base de datos
        await newProducto.save();

        // Respuesta exitosa
        res.status(200).json({ message: 'Producto guardado correctamente' });
    } catch (error) {
        console.error('Error al guardar producto:', error); // Depuración
        res.status(500).json({ error: 'Error al guardar el producto' });
    }
});

// Ruta raíz para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor en http://localhost:${port}`);
});

