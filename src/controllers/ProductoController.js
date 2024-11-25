// src/controllers/ProductoController.js

const ProductoService = require('../services/ProductoService');

class ProductoController {
  // Crear un nuevo producto
  static async crearProducto(req, res) {
    const { nombre, precio, descripcion, categoria, imagenes } = req.body;
    try {
      const nuevoProducto = await ProductoService.crearProducto({ nombre, precio, descripcion, categoria, imagenes });
      res.status(201).json({ message: 'Producto creado exitosamente', producto: nuevoProducto });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ error: 'Error interno al crear el producto' });
    }
  }

  // Obtener todos los productos
  static async obtenerProductos(req, res) {
    try {
      const productos = await ProductoService.obtenerProductos();
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error interno al obtener los productos' });
    }
  }

  // Obtener productos filtrados por categoría
  static async obtenerProductosPorCategoria(req, res) {
    const { categoria } = req.params;
    try {
      const productos = await ProductoService.obtenerProductosPorCategoria(categoria);
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener los productos por categoría:', error);
      res.status(500).json({ error: 'Error interno al obtener los productos' });
    }
  }

  // Obtener un producto por ID
  static async obtenerProducto(req, res) {
    const { id } = req.params;
    try {
      const producto = await ProductoService.obtenerProductoPorId(id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error interno al obtener el producto' });
    }
  }

  // Actualizar un producto
  static async actualizarProducto(req, res) {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria, imagenes } = req.body;
    try {
      const productoActualizado = await ProductoService.actualizarProducto(id, { nombre, precio, descripcion, categoria, imagenes });
      res.json({ message: 'Producto actualizado exitosamente', producto: productoActualizado });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error interno al actualizar el producto' });
    }
  }

  // Eliminar un producto
  static async eliminarProducto(req, res) {
    const { id } = req.params;
    try {
      await ProductoService.eliminarProducto(id);
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error interno al eliminar el producto' });
    }
  }
}

module.exports = ProductoController;
