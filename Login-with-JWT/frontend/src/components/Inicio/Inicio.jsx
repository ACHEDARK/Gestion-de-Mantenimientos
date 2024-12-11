import React, { useState, useEffect } from "react";
import "./Inicio.css";
import AgregarActivo from "./AgregarActivo";
import { useNavigate } from "react-router-dom";

const Inicio = ({ onLogout }) => {
  const [showAgregarActivo, setShowAgregarActivo] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [maquinas, setMaquinas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaquinas();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/maquinas");
      const data = await response.json();
      setMaquinas(data);
    } catch (error) {
      console.error("Error al cargar las máquinas:", error);
    }
  };

  const handleLogoutClick = () => setShowConfirmLogout(true);

  const confirmLogout = () => {
    setShowConfirmLogout(false);
    onLogout();
    navigate("/login");
  };

  const cancelLogout = () => setShowConfirmLogout(false);

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Sistema de Gestión</h2>
        <nav>
          <ul>
            <li className="active">Activos</li>
            <li onClick={() => navigate("/procesos-compras")}>
              Procesos de compra
            </li>
            <li>Mantenimientos</li>
            <li>Reportes</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogoutClick}>
          Cerrar Sesión
        </button>
      </div>

      <div className="content">
        <div className="header">
          <h1>Activos</h1>
          <button className="add-btn" onClick={() => setShowAgregarActivo(true)}>
            + Agregar Activo
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo Activo</th>
                <th>Activo</th>
                <th>Ubicación</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Serie</th>
                <th>Responsable</th>
                <th>Proceso de Compra</th>
                <th>Código de Barras</th>
                <th>Color</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {maquinas.length > 0 ? (
                maquinas.map((maquina, index) => (
                  <tr key={maquina.id}>
                    <td>{index + 1}</td>
                    <td>{maquina.tipo}</td>
                    <td>{maquina.nombre}</td>
                    <td>{maquina.ubicacion || "N/A"}</td>
                    <td>{maquina.marca}</td>
                    <td>{maquina.modelo}</td>
                    <td>{maquina.serie}</td>
                    <td>{maquina.responsable}</td>
                    <td>{maquina.proceso_compra || "N/A"}</td>
                    <td>{maquina.codigo_barras}</td>
                    <td>{maquina.color || "N/A"}</td>
                    <td>
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">No se encontraron activos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAgregarActivo && (
        <AgregarActivo onClose={() => setShowAgregarActivo(false)} />
      )}

      {showConfirmLogout && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmación</h2>
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="modal-actions">
              <button onClick={confirmLogout} className="confirm-button">
                Sí
              </button>
              <button onClick={cancelLogout} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
