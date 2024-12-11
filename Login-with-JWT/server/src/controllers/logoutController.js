// server/src/controllers/logoutController.js

// Supongamos que tienes una lista negra para invalidar tokens en tu base de datos o memoria
const blacklistedTokens = new Set(); // O usa tu base de datos

module.exports.logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtén el token del encabezado Authorization

    if (!token) {
        return res.status(400).send({ message: 'No se proporcionó un token' });
    }

    // Agrega el token a la lista negra
    blacklistedTokens.add(token);

    // Responde con éxito
    res.status(200).send({ message: 'Logout exitoso' });
};
