const db = require('../models/db');

const getUbicaciones = (req, res) => {
  const query = 'SELECT id, nombre FROM aulas'; // Obteniendo datos de la tabla 'aulas' como ubicaciones
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener ubicaciones:', error);
      res.status(500).json({ message: 'Error al obtener ubicaciones' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  getUbicaciones,
};
