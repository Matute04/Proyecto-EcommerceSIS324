// src/models/Producto.js

const db = require('../db'); // Asegúrate de que este sea tu archivo de conexión a la base de datos

class Producto {
  // Crear un producto
  static async crearProducto({ nombre, precio, descripcion, categoria, imagenes }) {
    const query = `INSERT INTO productos (nombre, precio, descripcion, categoria, imagenes) 
                   VALUES (?, ?, ?, ?, ?)`;
    const params = [nombre, precio, descripcion, categoria, imagenes];
    const result = await db.run(query, params);
    return { id: result.lastID, nombre, precio, descripcion, categoria, imagenes };
  }

  // Obtener todos los productos
  static async obtenerProductos() {
    const query = `SELECT * FROM productos`;
    const rows = await db.all(query); // No pasamos parámetros para obtener todos
    return rows;
  }

  // Obtener productos filtrados por categoría
  static async obtenerProductosPorCategoria(categoria) {
    const query = `SELECT * FROM productos WHERE categoria = ?`;
    const params = [categoria];
    const rows = await db.all(query, params);
    return rows;
  }

  // Obtener un producto por ID
  static async obtenerProductoPorId(id) {
    const query = `SELECT * FROM productos WHERE id = ?`;
    const params = [id];
    const row = await db.get(query, params);
    return row;
  }

  // Actualizar un producto
  static async actualizarProducto(id, { nombre, precio, descripcion, categoria, imagenes }) {
    const query = `UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, categoria = ?, imagenes = ? WHERE id = ?`;
    const params = [nombre, precio, descripcion, categoria, imagenes, id];
    await db.run(query, params);
    return { id, nombre, precio, descripcion, categoria, imagenes };
  }

  // Eliminar un producto
  static async eliminarProducto(id) {
    const query = `DELETE FROM productos WHERE id = ?`;
    const params = [id];
    await db.run(query, params);
  }
}

module.exports = Producto;
