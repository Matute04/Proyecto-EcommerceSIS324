// src/controllers/CarritoController.js

const Carrito = require('../models/Carrito');

class CarritoController {
  // Agregar un producto al carrito de un usuario
  static async agregarProducto(req, res) {
    const { usuarioId, productoId, cantidad } = req.body;
    try {
      await Carrito.agregarProducto(usuarioId, productoId, cantidad);
      res.status(201).json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      res.status(500).json({ error: 'Error interno al agregar el producto al carrito' });
    }
  }
  

  // Obtener todos los productos en el carrito de un usuario
  static async obtenerProductosPorUsuario(req, res) {
    const { usuarioId } = req.params;
    try {
      const productos = await Carrito.obtenerProductosPorUsuario(usuarioId);
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
      res.status(500).json({ error: 'Error interno al obtener los productos del carrito' });
    }
  }

  // Actualizar la cantidad de un producto en el carrito de un usuario
  static async actualizarCantidad(req, res) {
    const { id } = req.params;
    const { cantidad } = req.body;
    try {
      await Carrito.actualizarCantidad(id, cantidad);
      res.json({ message: 'Cantidad actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto en el carrito:', error);
      res.status(500).json({ error: 'Error interno al actualizar la cantidad del producto en el carrito' });
    }
  }

  // Eliminar un producto del carrito de un usuario
  static async eliminarProducto(req, res) {
    const { id } = req.params;
    try {
      await Carrito.eliminarProducto(id);
      res.json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
      res.status(500).json({ error: 'Error interno al eliminar el producto del carrito' });
    }
  }

  static async obtenerCarrito(req, res) {
    const { usuarioId } = req.params;
    try {
        const carrito = await Carrito.obtenerCarritoPorUsuario(usuarioId);
        res.status(200).json(carrito);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error interno al obtener el carrito' });
    }
  }

}

module.exports = CarritoController;
