const db = require("../models/db");

// Crear un nuevo proceso de compra
const createProcesoCompra = async (req, res) => {
  const { nombre, descripcion, fecha, proveedor_id } = req.body;

  if (!nombre || !fecha || !proveedor_id) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const query = "INSERT INTO proceso_compra (nombre, descripcion, fecha, proveedor_id) VALUES (?, ?, ?, ?)";
    const values = [nombre, descripcion, fecha, proveedor_id];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error al insertar proceso de compra:", error);
        return res.status(500).json({ error: "Error al insertar proceso de compra" });
      }

      res.status(201).json({ message: "Proceso de compra creado exitosamente", id: results.insertId });
    });
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los procesos de compra
const getProcesosCompra = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        p.fecha, 
        pr.nombre AS proveedor
      FROM proceso_compra p
      JOIN proveedores pr ON p.proveedor_id = pr.id
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error al obtener procesos de compra:", error);
        return res.status(500).json({ error: "Error al obtener procesos de compra" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createProcesoCompra,
  getProcesosCompra,
};
