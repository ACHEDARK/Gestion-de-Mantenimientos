const { obtenerProveedores, agregarProveedor } = require('../models/proveedores');

const getProveedores = async (req, res) => {
  try {
    const proveedores = await obtenerProveedores();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
};

const postProveedor = async (req, res) => {
  try {
    const nuevoProveedor = req.body;
    const result = await agregarProveedor(nuevoProveedor);
    res.json({ id: result.insertId, ...nuevoProveedor });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar proveedor' });
  }
};

module.exports = {
  getProveedores,
  postProveedor,
};
