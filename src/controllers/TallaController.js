// src/controllers/TallaController.js

const TallaService = require('../services/TallaService');

class TallaController {
  // Crear una nueva talla para un producto
  static async crearTalla(req, res) {
    const { producto_id, talla, cantidad } = req.body;
    try {
      const nuevaTalla = await TallaService.crearTalla({ producto_id, talla, cantidad });
      res.status(201).json({ message: 'Talla creada exitosamente', talla: nuevaTalla });
    } catch (error) {
      console.error('Error al crear la talla:', error);
      res.status(500).json({ error: 'Error interno al crear la talla' });
    }
  }

  // Obtener todas las tallas de un producto
  static async obtenerTallasPorProducto(req, res) {
    const { producto_id } = req.params;
    try {
      const tallas = await TallaService.obtenerTallasPorProducto(producto_id);
      res.json(tallas);
    } catch (error) {
      console.error('Error al obtener tallas del producto:', error);
      res.status(500).json({ error: 'Error interno al obtener tallas del producto' });
    }
  }

  // Obtener productos filtrados por talla
  static async obtenerProductosPorTalla(req, res) {
    const { talla } = req.params;
    try {
      const productos = await TallaService.obtenerProductosPorTalla(talla);
      if (productos.length > 0) {
        res.json(productos);
      } else {
        res.status(404).json({ error: 'No se encontraron productos con esa talla' });
      }
    } catch (error) {
      console.error('Error al obtener productos por talla:', error);
      res.status(500).json({ error: 'Error interno al obtener productos por talla' });
    }
  }

  // Actualizar la cantidad de una talla para un producto
  static async actualizarTalla(req, res) {
    const { producto_id, talla, nuevaCantidad } = req.body;
    try {
      const resultado = await TallaService.actualizarTalla(producto_id, talla, nuevaCantidad);
      if (resultado.changes > 0) {
        res.json({ message: 'Cantidad de talla actualizada exitosamente' });
      } else {
        res.status(404).json({ error: 'Talla no encontrada para ese producto' });
      }
    } catch (error) {
      console.error('Error al actualizar la talla:', error);
      res.status(500).json({ error: 'Error interno al actualizar la talla' });
    }
  }

  // Eliminar una talla de un producto
  static async eliminarTalla(req, res) {
    const { producto_id, talla } = req.params;
    try {
      const resultado = await TallaService.eliminarTalla(producto_id, talla);
      if (resultado.changes > 0) {
        res.json({ message: 'Talla eliminada exitosamente' });
      } else {
        res.status(404).json({ error: 'Talla no encontrada para ese producto' });
      }
    } catch (error) {
      console.error('Error al eliminar la talla:', error);
      res.status(500).json({ error: 'Error interno al eliminar la talla' });
    }
  }
}

module.exports = TallaController;
