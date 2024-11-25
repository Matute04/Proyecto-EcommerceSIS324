// src/models/Talla.js

const db = require('../db'); // Asegúrate de que este sea tu archivo de conexión a la base de datos

class Talla {
  // Crear una nueva talla para un producto
  static async crearTalla({ producto_id, talla, cantidad }) {
    const query = `
      INSERT INTO tallas (producto_id, talla, cantidad)
      VALUES (?, ?, ?);
    `;
    const params = [producto_id, talla, cantidad];
    const result = await db.run(query, params);
    return result;
  }

  // Obtener todas las tallas disponibles de un producto específico
  static async obtenerTallasPorProducto(producto_id) {
    const query = `
      SELECT * FROM tallas
      WHERE producto_id = ?;
    `;
    const params = [producto_id];
    const rows = await db.all(query, params);
    return rows;
  }

  // Obtener productos filtrados por una talla específica
  static async obtenerProductosPorTalla(talla) {
    const query = `
      SELECT p.* 
      FROM productos p
      JOIN tallas t ON p.id = t.producto_id
      WHERE t.talla = ?;
    `;
    const params = [talla];
    const rows = await db.all(query, params);
    return rows;
  }

  // Actualizar la cantidad de una talla para un producto
  static async actualizarTalla(producto_id, talla, nuevaCantidad) {
    const query = `
      UPDATE tallas
      SET cantidad = ?
      WHERE producto_id = ? AND talla = ?;
    `;
    const params = [nuevaCantidad, producto_id, talla];
    const result = await db.run(query, params);
    return result;
  }

  // Eliminar una talla de un producto
  static async eliminarTalla(producto_id, talla) {
    const query = `
      DELETE FROM tallas
      WHERE producto_id = ? AND talla = ?;
    `;
    const params = [producto_id, talla];
    const result = await db.run(query, params);
    return result;
  }
}

module.exports = Talla;
