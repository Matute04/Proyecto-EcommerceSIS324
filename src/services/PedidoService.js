// src/services/PedidoService.js

const Pedido = require('../models/Pedido');

class PedidoService {
  // Crear un pedido
  static async crearPedido(usuario_id, total, estado = 'pendiente') {
    try {
      const nuevoPedido = await Pedido.crearPedido({ usuario_id, total, estado });
      return nuevoPedido;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      throw new Error('Error al crear el pedido');
    }
  }

  // Obtener un pedido por ID
  static async obtenerPedido(id) {
    try {
      const pedido = await Pedido.obtenerPedidoPorId(id);
      return pedido;
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
      throw new Error('Error al obtener el pedido');
    }
  }

  // Obtener todos los pedidos de un usuario
  static async obtenerPedidosPorUsuario(usuario_id) {
    try {
      const pedidos = await Pedido.obtenerPedidosPorUsuario(usuario_id);
      return pedidos;
    } catch (error) {
      console.error('Error al obtener los pedidos del usuario:', error);
      throw new Error('Error al obtener los pedidos del usuario');
    }
  }

  // Actualizar el estado de un pedido
  static async actualizarEstadoPedido(id, estado) {
    try {
      await Pedido.actualizarEstadoPedido(id, estado);
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
      throw new Error('Error al actualizar el estado del pedido');
    }
  }

  // Obtener todos los pedidos
  static async obtenerTodosLosPedidos() {
    try {
      const pedidos = await Pedido.obtenerTodosLosPedidos();
      return pedidos;
    } catch (error) {
      console.error('Error al obtener todos los pedidos:', error);
      throw new Error('Error al obtener todos los pedidos');
    }
  }
}

module.exports = PedidoService;
