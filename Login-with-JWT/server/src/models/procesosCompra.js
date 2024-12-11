const db = require('../models/db');

// Obtener todos los procesos de compra
const obtenerProcesosCompra = async () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT pc.id, pc.fecha, p.nombre AS proveedor
      FROM procesos_compra pc
      JOIN proveedores p ON pc.proveedor_id = p.id
    `;
    db.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Insertar un nuevo proceso de compra
const agregarProcesoCompra = async (proceso) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO procesos_compra (fecha, proveedor_id) VALUES (?, ?)';
    const values = [proceso.fecha, proceso.proveedor_id];
    db.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  obtenerProcesosCompra,
  agregarProcesoCompra,
};
