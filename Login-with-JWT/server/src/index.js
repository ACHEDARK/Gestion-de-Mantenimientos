const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Importar rutas
const routes = require('./api/endPoints'); // Rutas principales

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"], // Asegúrate de que el puerto coincida con tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Registrar rutas principales
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Ocurrió un error interno en el servidor',
    });
});
