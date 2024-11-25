const sqlite3 = require('sqlite3').verbose();
const Chance = require('chance');
const chance = new Chance();

// Conectar a la base de datos
const db = new sqlite3.Database('./src/database/ecommerce.db');

// Insertar datos de ejemplo en la tabla productos
function insertarDatosProductos() {
  for (let i = 0; i < 10; i++) {
    const nombre = chance.word({ length: 5 });
    const precio = chance.floating({ min: 10, max: 100, fixed: 2 });
    const descripcion = chance.sentence({ words: 10 });
    const categoria = chance.word();
    const imagenes = `imagen_producto_${i}.jpg`;

    const query = `INSERT INTO productos (nombre, precio, descripcion, categoria, imagenes) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [nombre, precio, descripcion, categoria, imagenes], function (err) {
      if (err) {
        console.error('Error al insertar producto:', err);
      }
    });
  }
}

// Insertar datos de ejemplo en la tabla usuarios
function insertarDatosUsuarios() {
  for (let i = 0; i < 10; i++) {
    const nombre = chance.name();
    const email = chance.email();
    const password = chance.word();
    const direccion = chance.address();
    const telefono = chance.phone();

    const query = `INSERT INTO usuarios (nombre, email, password, direccion, telefono) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [nombre, email, password, direccion, telefono], function (err) {
      if (err) {
        console.error('Error al insertar usuario:', err);
      }
    });
  }
}

// Insertar datos de ejemplo en la tabla pedidos
function insertarDatosPedidos() {
  for (let i = 0; i < 10; i++) {
    const usuario_id = chance.integer({ min: 1, max: 10 });
    const total = chance.floating({ min: 10, max: 100, fixed: 2 });
    const estado = chance.pickone(['pendiente', 'enviado', 'entregado']);
    const query = `INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)`;
    db.run(query, [usuario_id, total, estado], function (err) {
      if (err) {
        console.error('Error al insertar pedido:', err);
      }
    });
  }
}

// Insertar datos de ejemplo en la tabla carrito
function insertarDatosCarrito() {
  for (let i = 0; i < 10; i++) {
    const usuario_id = chance.integer({ min: 1, max: 10 });
    const producto_id = chance.integer({ min: 1, max: 10 });
    const cantidad = chance.integer({ min: 1, max: 5 });

    const query = `INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)`;
    db.run(query, [usuario_id, producto_id, cantidad], function (err) {
      if (err) {
        console.error('Error al insertar carrito:', err);
      }
    });
  }
}

// Llamar a las funciones de inserción
db.serialize(() => {
  insertarDatosProductos();
  insertarDatosUsuarios();
  insertarDatosPedidos();
  insertarDatosCarrito();
});

// Cerrar la conexión
db.close((err) => {
  if (err) {
    console.error('Error al cerrar la base de datos:', err);
  } else {
    console.log('Base de datos cerrada');
  }
});
