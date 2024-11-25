CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  precio REAL NOT NULL,
  descripcion TEXT,
  categoria TEXT NOT NULL,
  imagenes TEXT -- Ruta o nombre de la carpeta de imágenes
);
