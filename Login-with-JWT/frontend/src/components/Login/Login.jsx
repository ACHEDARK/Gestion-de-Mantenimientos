import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import fiseiLogo from "../Images/fiseilogo.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    const data = { username, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token); // Almacenar token
        setErrorMessage(""); // Limpiar mensaje de error
        navigate("/inicio"); // Redirigir al inicio
      } else {
        setErrorMessage("Error al procesar la respuesta del servidor.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={fiseiLogo} alt="Logo de FISEI" className="fisei-logo" />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Universidad Técnica de Ambato</h1>
            <h2>Gestor de Mantenimiento</h2>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Correo Institucional:</label>
              <input
                id="username"
                placeholder="Correo Institucional"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="login-options">
              <label>
                <input type="checkbox" /> Recuérdame
              </label>
            </div>

            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>

          <div className="login-footer">
            <p>
              <a href="#fisei">¿Olvidaste tu contraseña?</a> |{" "}
              <a href="#register">Registrarse</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
