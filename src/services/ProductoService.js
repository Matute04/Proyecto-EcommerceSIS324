// src/services/ProductoService.js

const Producto = require('../models/Producto');

class ProductoService {
  // Crear un nuevo producto
  static async crearProducto({ nombre, precio, descripcion, categoria, imagenes }) {
    const nuevoProducto = await Producto.crearProducto({ nombre, precio, descripcion, categoria, imagenes });
    return nuevoProducto;
  }

  // Obtener todos los productos
  static async obtenerProductos() {
    const productos = await Producto.obtenerProductos();
    return productos;
  }

  // Obtener productos filtrados por categoría
  static async obtenerProductosPorCategoria(categoria) {
    const productos = await Producto.obtenerProductosPorCategoria(categoria);
    return productos;
  }

  // Obtener un producto por ID
  static async obtenerProductoPorId(id) {
    const producto = await Producto.obtenerProductoPorId(id);
    return producto;
  }

  // Actualizar un producto
  static async actualizarProducto(id, { nombre, precio, descripcion, categoria, imagenes }) {
    const productoActualizado = await Producto.actualizarProducto(id, { nombre, precio, descripcion, categoria, imagenes });
    return productoActualizado;
  }

  // Eliminar un producto
  static async eliminarProducto(id) {
    await Producto.eliminarProducto(id);
  }
}

module.exports = ProductoService;
