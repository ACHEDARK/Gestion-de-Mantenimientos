import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Inicio from "../Inicio/Inicio";
import ProcesoCompras from "../ProcesoCompras/ProcesoCompras";

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login"); // Redirige si no está autenticado
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    setIsAuthenticated(false);
    navigate("/login"); // Redirige al login
  };

  return (
    <Routes>
      {/* Ruta de Login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta protegida de Inicio */}
      <Route
        path="/inicio"
        element={isAuthenticated ? <Inicio onLogout={handleLogout} /> : <Login />}
      />

      {/* Ruta protegida para ProcesoCompras */}
      <Route
        path="/procesos-compras"
        element={isAuthenticated ? <ProcesoCompras onLogout={handleLogout} /> : <Login />}
      />

      {/* Ruta por defecto (redirección a Login) */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Main;
