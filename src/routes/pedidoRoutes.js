// src/routes/pedidoRoutes.js

const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const router = express.Router();

// Crear un nuevo pedido
router.post('/', PedidoController.crearPedido);

// Obtener un pedido por ID
router.get('/:id', PedidoController.obtenerPedido);

// Obtener todos los pedidos de un usuario
router.get('/usuario/:usuario_id', PedidoController.obtenerPedidosPorUsuario);

// Actualizar el estado de un pedido
router.put('/:id/estado', PedidoController.actualizarEstadoPedido);

// Obtener todos los pedidos
router.get('/', PedidoController.obtenerTodosLosPedidos);

module.exports = router;
