CREATE TABLE IF NOT EXISTS tallas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id INTEGER NOT NULL,
  talla TEXT NOT NULL,  -- Talla del zapato (por ejemplo: '40', '41', etc.)
  cantidad INTEGER NOT NULL,  -- Cantidad disponible de esa talla
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);
