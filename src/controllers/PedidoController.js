// src/controllers/PedidoController.js

const PedidoService = require('../services/PedidoService');

class PedidoController {
  // Crear un nuevo pedido
  static async crearPedido(req, res) {
    const { usuario_id, total, estado } = req.body;
    try {
      const nuevoPedido = await PedidoService.crearPedido(usuario_id, total, estado);
      res.status(201).json({ message: 'Pedido creado exitosamente', pedido: nuevoPedido });
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      res.status(500).json({ error: 'Error interno al crear el pedido' });
    }
  }

  // Obtener un pedido por ID
  static async obtenerPedido(req, res) {
    const { id } = req.params;
    try {
      const pedido = await PedidoService.obtenerPedido(id);
      if (pedido) {
        res.json(pedido);
      } else {
        res.status(404).json({ error: 'Pedido no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
      res.status(500).json({ error: 'Error interno al obtener el pedido' });
    }
  }

  // Obtener todos los pedidos de un usuario
  static async obtenerPedidosPorUsuario(req, res) {
    const { usuario_id } = req.params;
    try {
      const pedidos = await PedidoService.obtenerPedidosPorUsuario(usuario_id);
      res.json(pedidos);
    } catch (error) {
      console.error('Error al obtener los pedidos del usuario:', error);
      res.status(500).json({ error: 'Error interno al obtener los pedidos del usuario' });
    }
  }

  // Actualizar el estado de un pedido
  static async actualizarEstadoPedido(req, res) {
    const { id } = req.params;
    const { estado } = req.body;
    try {
      await PedidoService.actualizarEstadoPedido(id, estado);
      res.json({ message: 'Estado del pedido actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
      res.status(500).json({ error: 'Error interno al actualizar el estado del pedido' });
    }
  }

  // Obtener todos los pedidos
  static async obtenerTodosLosPedidos(req, res) {
    try {
      const pedidos = await PedidoService.obtenerTodosLosPedidos();
      res.json(pedidos);
    } catch (error) {
      console.error('Error al obtener todos los pedidos:', error);
      res.status(500).json({ error: 'Error interno al obtener todos los pedidos' });
    }
  }
}

module.exports = PedidoController;
