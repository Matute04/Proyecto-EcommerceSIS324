// src/models/Carrito.js

const db = require('../db'); // Asegúrate de que este sea tu archivo de conexión a la base de datos

class Carrito {
  // Agregar un producto al carrito
  static async agregarProducto(usuarioId, productoId, cantidad) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)';
      db.run(query, [usuarioId, productoId, cantidad], function(err) {
        if (err) {
          console.error('Error al agregar el producto al carrito:', err);
          return reject(err); // Rechazar la promesa si hay un error
        }
        resolve(this.lastID); // Devuelve el ID del último registro insertado
      });
    });
  }

  // Obtener todos los productos del carrito de un usuario
  static async obtenerCarritoPorUsuario(usuarioId) {
    const query = `
        SELECT c.id, c.cantidad, p.nombre, p.precio, p.imagen
        FROM carrito c
        JOIN productos p ON c.producto_id = p.id
        WHERE c.usuario_id = ?`;
    return db.all(query, [usuarioId]);
  }


  // Eliminar un producto del carrito
  static async eliminarProductoDelCarrito(usuario_id, producto_id) {
    const query = `
      DELETE FROM carrito
      WHERE usuario_id = ? AND producto_id = ?;
    `;
    const params = [usuario_id, producto_id];
    const result = await db.run(query, params);
    return result;
  }

  // Actualizar la cantidad de un producto en el carrito
  static async actualizarCantidadProducto(usuario_id, producto_id, cantidad) {
    const query = `
      UPDATE carrito
      SET cantidad = ?
      WHERE usuario_id = ? AND producto_id = ?;
    `;
    const params = [cantidad, usuario_id, producto_id];
    const result = await db.run(query, params);
    return result;
  }
}

module.exports = Carrito;
