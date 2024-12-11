const db = require('../models/db');

// Controlador para obtener todas las aulas
const obtenerAulas = (req, res) => {
  const query = 'SELECT * FROM aulas';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las aulas:', err);
      return res.status(500).json({ error: 'Error al obtener las aulas' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  obtenerAulas,
};
