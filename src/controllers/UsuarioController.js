// src/controllers/UsuarioController.js

const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
  // Crear un nuevo usuario
  static async crearUsuario(req, res) {
    const { nombre, email, password, direccion, telefono } = req.body;
    try {
      await UsuarioService.crearUsuario({ nombre, email, password, direccion, telefono });
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un usuario por ID
  static async obtenerUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await UsuarioService.obtenerUsuarioPorId(id);
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar usuario
  static async actualizarUsuario(req, res) {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    try {
      await UsuarioService.actualizarUsuario(id, { nombre, direccion, telefono });
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar usuario
  static async eliminarUsuario(req, res) {
    const { id } = req.params;
    try {
      await UsuarioService.eliminarUsuario(id);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ error: error.message });
    }
  }
  // En UsuarioController.js

// Ruta para login
static async login(req, res) {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await Usuario.verificarPassword(usuario.id, password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    // Generar un token de sesión o algún mecanismo de autenticación
    // (aquí podrías usar JWT, sesiones, etc. dependiendo de tu implementación)
    const token = 'aquí_deberías_generar_un_token';  // Esto es solo un ejemplo

    res.status(200).json({
      message: 'Usuario autenticado exitosamente',
      token: token, // Devuelve el token al cliente
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: error.message });
  }
}

}


module.exports = UsuarioController;
