const express = require('express');
const router = express.Router();

// Importar controladores necesarios
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { obtenerAulas } = require('../controllers/aulasController');
const { 
  obtenerMaquinas, 
  crearMaquina, 
  obtenerMaquinaPorId, 
  actualizarMaquina, 
  eliminarMaquina 
} = require('../controllers/maquinasController');
const { getUbicaciones } = require('../controllers/ubicacionesController');
const { 
  getProveedores, 
  postProveedor 
} = require('../controllers/proveedoresController');
const { 
  createProcesoCompra, 
  getProcesosCompra 
} = require('../controllers/procesosCompraController');

// Rutas principales

// Endpoint de prueba
router.get('/ping', ping);

// Endpoint de login
router.post('/login', login);

// Endpoint para obtener aulas
router.get('/api/aulas', obtenerAulas);

// Endpoint para manejar máquinas
router.get('/api/maquinas', obtenerMaquinas);
router.post('/api/maquinas', crearMaquina);
router.get('/api/maquinas/:id', obtenerMaquinaPorId);
router.put('/api/maquinas/:id', actualizarMaquina);
router.delete('/api/maquinas/:id', eliminarMaquina);

// Endpoint para obtener ubicaciones
router.get('/api/ubicaciones', getUbicaciones);

//--------------------------------------------------------------

// Ruta para obtener los proveedores
router.get('/api/proveedores', getProveedores);

// Ruta para agregar un nuevo proveedor
router.post('/api/proveedores', postProveedor);

//--------------------------------------------------------------

// Ruta para guardar un nuevo proceso de compra
router.post('/api/procesosCompra', createProcesoCompra);

// Ruta para obtener todos los procesos de compra
router.get('/api/procesosCompra', getProcesosCompra);

module.exports = router;
