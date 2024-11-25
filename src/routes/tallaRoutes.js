// src/routes/tallaRoutes.js

const express = require('express');
const TallaController = require('../controllers/TallaController');
const router = express.Router();

// Crear talla
router.post('/', TallaController.crearTalla); 

// Obtener todas las tallas de un producto
router.get('/producto/:producto_id', TallaController.obtenerTallasPorProducto); 

// Obtener productos por talla
router.get('/talla/:talla', TallaController.obtenerProductosPorTalla); 

// Actualizar cantidad de una talla
router.put('/', TallaController.actualizarTalla); 

// Eliminar una talla de un producto
router.delete('/:producto_id/:talla', TallaController.eliminarTalla);

module.exports = router;
