  const express = require('express');
  const bodyParser = require('body-parser');
  const sqlite3 = require('sqlite3').verbose(); // Usamos sqlite3
  const jwt = require('jsonwebtoken'); // Para crear el token JWT
  require('dotenv').config();

  // Crear la conexión a la base de datos SQLite
  const db = new sqlite3.Database('./src/database/ecommerce.db', (err) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
      process.exit(1); // Termina el proceso si no se puede conectar
    }
    console.log('Conexión a la base de datos SQLite exitosa');
  });

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(bodyParser.json()); // Permite el uso de JSON en las peticiones
  app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

  // Ruta de prueba (puedes reemplazarla con las rutas de tu API)
  app.get('/', (req, res) => {
    res.send('¡Servidor en funcionamiento!');
  });

  // Rutas para productos
  app.get('/api/productos', (req, res) => {
    db.all('SELECT * FROM productos', [], (err, rows) => {
      if (err) {
        console.error('Error al consultar productos:', err.message);
        return res.status(500).json({ error: 'Error al obtener productos' });
      }
      res.json(rows);
    });
  });

  
  
  // Rutas para usuarios
  app.get('/api/usuarios', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
      if (err) {
        console.error('Error al consultar usuarios:', err.message);
        return res.status(500).json({ error: 'Error al obtener usuarios' });
      }
      res.json(rows);
    });
  });

  // Rutas para pedidos
  app.get('/api/pedidos', (req, res) => {
    db.all('SELECT * FROM pedidos', [], (err, rows) => {
      if (err) {
        console.error('Error al consultar pedidos:', err.message);
        return res.status(500).json({ error: 'Error al obtener pedidos' });
      }
      res.json(rows);
    });
  });

  // Rutas para carrito
  app.get('/api/carrito', (req, res) => {
    db.all('SELECT * FROM carrito', [], (err, rows) => {
      if (err) {
        console.error('Error al consultar carrito:', err.message);
        return res.status(500).json({ error: 'Error al obtener carrito' });
      }
      res.json(rows);
    });
  });

  app.get('/api/carrito/:usuarioId', (req, res) => {
    const usuarioId = req.params.usuarioId;
    
    const query = `
      SELECT carrito.*, productos.nombre, productos.precio, productos.descripcion
      FROM carrito
      JOIN productos ON carrito.producto_id = productos.id
      WHERE carrito.usuario_id = ?
    `;
    
    db.all(query, [usuarioId], (err, rows) => {
      if (err) {
        console.error('Error al consultar carrito:', err.message);
        return res.status(500).json({ error: 'Error al obtener carrito' });
      }
      res.json(rows);
    });
  });
  

  app.post('/api/carrito', (req, res) => {
    const { usuarioId, productoId, cantidad } = req.body;
    const query = 'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)';
    db.run(query, [usuarioId, productoId, cantidad], function (err) {
      if (err) {
        console.error('Error al agregar al carrito:', err.message);
        return res.status(500).json({ error: 'Error al agregar producto al carrito' });
      }
      res.status(201).json({ id: this.lastID, usuario_id: usuarioId, producto_id: productoId, cantidad });
    });
  });

  app.delete('/api/carrito/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM carrito WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Error al eliminar producto del carrito:', err.message);
            return res.status(500).json({ error: 'Error interno al eliminar el producto del carrito' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        res.json({ message: 'Producto eliminado del carrito exitosamente' });
    });
});


 // Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No estás autenticado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user; // Adjuntar los datos del usuario a la solicitud
    next();
  });
}

// Ruta de login con JWT
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, user) => {
        if (err) {
            console.error('Error al consultar el usuario:', err.message);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (!user) {
            return res.status(401).json({ message: 'El correo no está registrado' });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('Error: JWT_SECRET no está configurado.');
            process.exit(1);
        }
      
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Aquí se incluye el id en la respuesta
        res.json({ user: { id: user.id, nombre: user.nombre, email: user.email }, token });
    });
});

app.delete('/api/carrito/:usuarioId', (req, res) => {
  const usuarioId = req.params.usuarioId;
  
  // Aquí va la lógica para borrar todos los productos del carrito en la base de datos
  // Ejemplo con un modelo de carrito:
  Carrito.deleteMany({ usuarioId })
      .then(() => {
          res.status(200).json({ message: 'Carrito vacío' });
      })
      .catch(error => {
          res.status(500).json({ message: 'Error al vaciar el carrito', error });
      });
});

app.post('/api/usuarios', async (req, res) => {
  const { nombre, email, password, direccion, telefono } = req.body;

  try {

    const query = `
      INSERT INTO usuarios (nombre, email, password, direccion, telefono)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.run(query, [nombre, email, password, direccion, telefono]);

    // Devolver el usuario creado como respuesta
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Ruta para filtrar productos por categoría
app.get('/api/productos/categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria;

  db.all('SELECT * FROM productos WHERE categoria = ?', [categoria], (err, rows) => {
    if (err) {
      console.error('Error al consultar productos por categoría:', err.message);
      return res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
    res.json(rows);
  });
});

// Ruta para filtrar productos por categoría
app.get('/api/productos/nombre/:categoria', (req, res) => {
  const categoria = req.params.categoria;

  db.all('SELECT * FROM productos WHERE nombre = ?', [categoria], (err, rows) => {
    if (err) {
      console.error('Error al consultar productos por categoría:', err.message);
      return res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
    res.json(rows);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
