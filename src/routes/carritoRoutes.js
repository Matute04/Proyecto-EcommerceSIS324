// src/routes/carritoRoutes.js

const express = require('express');
const CarritoController = require('../controllers/CarritoController'); // Asegúrate de que este controlador esté correctamente importado
const router = express.Router();

// Asegúrate de que cada ruta esté llamando a una función válida del controlador
router.post('/', CarritoController.agregarAlCarrito); // Asegúrate de que 'agregarAlCarrito' esté definido en CarritoController
router.get('/:usuarioId', CarritoController.obtenerCarrito); // Ruta para obtener carrito de un usuario específico
router.put('/:id', CarritoController.actualizarCarrito); // Ruta para actualizar un producto en el carrito
router.delete('/:id', CarritoController.eliminarDelCarrito); // Ruta para eliminar un producto del carrito

module.exports = router;
