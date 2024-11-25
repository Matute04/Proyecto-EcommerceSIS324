// src/routes/productoRoutes.js

const express = require('express');
const ProductoController = require('../controllers/ProductoController');
const router = express.Router();

router.post('/', ProductoController.crearProducto); // Crear producto
router.get('/', ProductoController.obtenerProductos); // Obtener todos los productos
router.get('/categoria/:categoria', ProductoController.obtenerProductosPorCategoria); // Obtener productos por categoría
router.get('/:id', ProductoController.obtenerProducto); // Obtener producto por ID
router.put('/:id', ProductoController.actualizarProducto); // Actualizar producto
router.delete('/:id', ProductoController.eliminarProducto); // Eliminar producto

module.exports = router;
