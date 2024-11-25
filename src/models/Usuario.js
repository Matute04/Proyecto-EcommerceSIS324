const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const db = require('../database/sqlite'); // Conexión a la base de datos

class Usuario {
  constructor(id, nombre, email, password, direccion, telefono) {
    this.id = id; // ID único del usuario
    this.nombre = nombre; // Nombre del usuario
    this.email = email; // Correo electrónico del usuario
    this.password = password; // Contraseña (encriptada)
    this.direccion = direccion; // Dirección de envío
    this.telefono = telefono; // Número de contacto
  }

  // Guardar un usuario en la base de datos
  static async crearUsuario({ nombre, email, password, direccion, telefono }) {
    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.obtenerUsuarioPorEmail(email);
    if (usuarioExistente) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Encriptar la contraseña antes de guardarla
    const hashPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO usuarios (nombre, email, password, direccion, telefono)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.run(query, [nombre, email, hashPassword, direccion, telefono]);
  }

  // Obtener un usuario por ID
  static async obtenerUsuarioPorId(id) {
    const query = `SELECT * FROM usuarios WHERE id = ?`;
    return await db.get(query, [id]);
  }

  // Obtener un usuario por email
  static async obtenerUsuarioPorEmail(email) {
    const query = `SELECT * FROM usuarios WHERE email = ?`;
    return await db.get(query, [email]);
  }

  // Actualizar la información de un usuario
  static async actualizarUsuario(id, { nombre, direccion, telefono }) {
    const query = `
      UPDATE usuarios
      SET nombre = ?, direccion = ?, telefono = ?
      WHERE id = ?
    `;
    await db.run(query, [nombre, direccion, telefono, id]);
  }

  // Cambiar la contraseña de un usuario
  static async cambiarPassword(id, nuevoPassword) {
    const hashPassword = await bcrypt.hash(nuevoPassword, 10);
    const query = `
      UPDATE usuarios
      SET password = ?
      WHERE id = ?
    `;
    await db.run(query, [hashPassword, id]);
  }

  // Eliminar un usuario
  static async eliminarUsuario(id) {
    const query = `DELETE FROM usuarios WHERE id = ?`;
    await db.run(query, [id]);
  }

  // Verificar si la contraseña es correcta
  static async verificarPassword(id, password) {
    const usuario = await Usuario.obtenerUsuarioPorId(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    return isPasswordValid;
  }
}

module.exports = Usuario;
