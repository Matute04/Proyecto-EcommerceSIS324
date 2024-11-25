// src/services/UsuarioService.js

const Usuario = require('../models/Usuario');

class UsuarioService {
  // Crear un nuevo usuario
  static async crearUsuario({ nombre, email, password, direccion, telefono }) {
    try {
      // Llamamos al modelo para crear el usuario
      await Usuario.crearUsuario({ nombre, email, password, direccion, telefono });
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  // Obtener un usuario por ID
  static async obtenerUsuarioPorId(id) {
    try {
      const usuario = await Usuario.obtenerUsuarioPorId(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Error al obtener el usuario: ' + error.message);
    }
  }

  // Actualizar un usuario
  static async actualizarUsuario(id, { nombre, direccion, telefono }) {
    try {
      await Usuario.actualizarUsuario(id, { nombre, direccion, telefono });
    } catch (error) {
      throw new Error('Error al actualizar el usuario: ' + error.message);
    }
  }

  // Eliminar un usuario
  static async eliminarUsuario(id) {
    try {
      await Usuario.eliminarUsuario(id);
    } catch (error) {
      throw new Error('Error al eliminar el usuario: ' + error.message);
    }
  }
}

module.exports = UsuarioService;
