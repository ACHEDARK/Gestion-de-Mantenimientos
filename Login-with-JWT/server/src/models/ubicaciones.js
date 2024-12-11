const db = require('../models/db');

const obtenerUbicaciones = async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, nombre FROM aulas';
    db.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = {
  obtenerUbicaciones,
};
