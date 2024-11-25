// src/models/Pedido.js

const db = require('../db'); // Asegúrate de que este sea tu archivo de conexión a la base de datos

class Pedido {
  // Crear un nuevo pedido
  static async crearPedido({ usuario_id, total, estado }) {
    const query = `
      INSERT INTO pedidos (usuario_id, total, estado)
      VALUES (?, ?, ?);
    `;
    const params = [usuario_id, total, estado];
    const result = await db.run(query, params);
    return result;
  }

  // Obtener un pedido por ID
  static async obtenerPedidoPorId(id) {
    const query = `SELECT * FROM pedidos WHERE id = ?`;
    const params = [id];
    const row = await db.get(query, params);
    return row;
  }

  // Obtener todos los pedidos de un usuario
  static async obtenerPedidosPorUsuario(usuario_id) {
    const query = `SELECT * FROM pedidos WHERE usuario_id = ?`;
    const params = [usuario_id];
    const rows = await db.all(query, params);
    return rows;
  }

  // Actualizar estado de un pedido
  static async actualizarEstadoPedido(id, estado) {
    const query = `UPDATE pedidos SET estado = ? WHERE id = ?`;
    const params = [estado, id];
    await db.run(query, params);
  }

  // Obtener todos los pedidos
  static async obtenerTodosLosPedidos() {
    const query = `SELECT * FROM pedidos`;
    const rows = await db.all(query);
    return rows;
  }
}

module.exports = Pedido;
