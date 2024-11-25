// src/services/TallaService.js

const Talla = require('../models/Talla');

class TallaService {
  // Crear una nueva talla para un producto
  static async crearTalla({ producto_id, talla, cantidad }) {
    const nuevaTalla = await Talla.crearTalla({ producto_id, talla, cantidad });
    return nuevaTalla;
  }

  // Obtener todas las tallas disponibles de un producto
  static async obtenerTallasPorProducto(producto_id) {
    const tallas = await Talla.obtenerTallasPorProducto(producto_id);
    return tallas;
  }

  // Obtener todos los productos que tienen una talla específica
  static async obtenerProductosPorTalla(talla) {
    const productos = await Talla.obtenerProductosPorTalla(talla);
    return productos;
  }

  // Actualizar la cantidad de una talla para un producto
  static async actualizarTalla(producto_id, talla, nuevaCantidad) {
    const resultado = await Talla.actualizarTalla(producto_id, talla, nuevaCantidad);
    return resultado;
  }

  // Eliminar una talla de un producto
  static async eliminarTalla(producto_id, talla) {
    const resultado = await Talla.eliminarTalla(producto_id, talla);
    return resultado;
  }
}

module.exports = TallaService;
