const Maquinas = require('../models/maquinas');

const crearMaquina = (req, res) => {
  Maquinas.crearMaquina(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear la máquina' });
    res.status(201).json({ message: 'Máquina creada', id: result.insertId });
  });
};

const obtenerMaquinas = (req, res) => {
  Maquinas.obtenerMaquinas((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener máquinas' });
    res.status(200).json(results);
  });
};

const obtenerMaquinaPorId = (req, res) => {
  const id = req.params.id;
  Maquinas.obtenerMaquinaPorId(id, (err, maquina) => {
    if (err) return res.status(500).json({ error: 'Error al obtener la máquina' });
    if (!maquina) return res.status(404).json({ error: 'Máquina no encontrada' });
    res.status(200).json(maquina);
  });
};

const actualizarMaquina = (req, res) => {
  const id = req.params.id;
  Maquinas.actualizarMaquina(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la máquina' });
    res.status(200).json({ message: 'Máquina actualizada' });
  });
};

const eliminarMaquina = (req, res) => {
  const id = req.params.id;
  Maquinas.eliminarMaquina(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar la máquina' });
    res.status(200).json({ message: 'Máquina eliminada' });
  });
};

module.exports = {
  crearMaquina,
  obtenerMaquinas,
  obtenerMaquinaPorId,
  actualizarMaquina,
  eliminarMaquina,
};
