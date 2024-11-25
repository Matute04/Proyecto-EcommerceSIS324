// src/database/sqlite.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'ecommerce.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Conexión a SQLite exitosa.');
  }
});

module.exports = db;
// src/database/sqlite.js (añadir al final del archivo)
const fs = require('fs');
const migrationsPath = path.resolve(__dirname, 'migrations');

fs.readdirSync(migrationsPath).forEach((file) => {
  const sql = fs.readFileSync(path.join(migrationsPath, file), 'utf8');
  db.exec(sql, (err) => {
    if (err) console.error(`Error al ejecutar ${file}:`, err.message);
  });
});