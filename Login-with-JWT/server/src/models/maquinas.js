const db = require('./db');

// Crear una nueva máquina
const crearMaquina = (data, callback) => {
  const sql = `
    INSERT INTO maquinas (nombre, tipo, marca, modelo, serie, codigo_barras, responsable, estado, color, id_proceso_compra, id_aula)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.nombre,
    data.tipo,
    data.marca,
    data.modelo,
    data.serie,
    data.codigo_barras,
    data.responsable,
    data.estado || 'Activo',
    data.color || null,
    data.id_proceso_compra || null,
    data.id_aula,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Obtener todas las máquinas
const obtenerMaquinas = (callback) => {
  const sql = `
    SELECT m.*, a.nombre AS ubicacion, p.nombre AS proceso_compra
    FROM maquinas m
    LEFT JOIN aulas a ON m.id_aula = a.id
    LEFT JOIN proceso_compra p ON m.id_proceso_compra = p.id
  `;
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Obtener una máquina por ID
const obtenerMaquinaPorId = (id, callback) => {
  const sql = `
    SELECT m.*, a.nombre AS ubicacion, p.nombre AS proceso_compra
    FROM maquinas m
    LEFT JOIN aulas a ON m.id_aula = a.id
    LEFT JOIN proceso_compra p ON m.id_proceso_compra = p.id
    WHERE m.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Actualizar una máquina
const actualizarMaquina = (id, data, callback) => {
  const sql = `
    UPDATE maquinas
    SET nombre = ?, tipo = ?, marca = ?, modelo = ?, serie = ?, codigo_barras = ?, responsable = ?, estado = ?, color = ?, id_proceso_compra = ?, id_aula = ?
    WHERE id = ?
  `;
  const values = [
    data.nombre,
    data.tipo,
    data.marca,
    data.modelo,
    data.serie,
    data.codigo_barras,
    data.responsable,
    data.estado,
    data.color || null,
    data.id_proceso_compra || null,
    data.id_aula,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Eliminar una máquina
const eliminarMaquina = (id, callback) => {
  const sql = `DELETE FROM maquinas WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  crearMaquina,
  obtenerMaquinas,
  obtenerMaquinaPorId,
  actualizarMaquina,
  eliminarMaquina,
};
