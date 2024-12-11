const db = require('../models/db');

// Obtener todos los proveedores
const obtenerProveedores = async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, nombre, direccion, telefono, email FROM proveedores';
    db.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Insertar un nuevo proveedor
const agregarProveedor = async (proveedor) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO proveedores (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)';
    const values = [proveedor.nombre, proveedor.direccion, proveedor.telefono, proveedor.email];
    db.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  obtenerProveedores,
  agregarProveedor,
};
