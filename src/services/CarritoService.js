// src/services/CarritoService.js

const Carrito = require('../models/Carrito');

class CarritoService {
  // Agregar un producto al carrito
  static async agregarProductoAlCarrito({ usuario_id, producto_id, cantidad }) {
    const resultado = await Carrito.agregarProductoAlCarrito({ usuario_id, producto_id, cantidad });
    return resultado;
  }

  // Obtener todos los productos en el carrito de un usuario
  static async obtenerCarritoPorUsuario(usuario_id) {
    const carrito = await Carrito.obtenerCarritoPorUsuario(usuario_id);
    return carrito;
  }

  // Eliminar un producto del carrito
  static async eliminarProductoDelCarrito(usuario_id, producto_id) {
    const resultado = await Carrito.eliminarProductoDelCarrito(usuario_id, producto_id);
    return resultado;
  }

  // Actualizar la cantidad de un producto en el carrito
  static async actualizarCantidadProducto(usuario_id, producto_id, cantidad) {
    const resultado = await Carrito.actualizarCantidadProducto(usuario_id, producto_id, cantidad);
    return resultado;
  }
}

module.exports = CarritoService;
