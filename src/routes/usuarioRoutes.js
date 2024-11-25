// src/routes/usuarioRoutes.js

const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const router = express.Router();

// Ruta para crear un usuario
router.post('/', async (req, res) => {
  try {
    await UsuarioController.crearUsuario(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    await UsuarioController.obtenerUsuario(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    await UsuarioController.actualizarUsuario(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    await UsuarioController.eliminarUsuario(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// En usuarioRoutes.js

// Ruta para login
router.post('/login', async (req, res) => {
  try {
    await UsuarioController.login(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
