import React, { useState, useEffect } from "react";
import "./ProcesoCompras.css";
import { useNavigate } from "react-router-dom";

const ProcesoCompras = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    proveedor_id: "",
  });
  const [proveedores, setProveedores] = useState([]);
  const [procesosCompra, setProcesosCompra] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [proveedoresResponse, procesosResponse] = await Promise.all([
        fetch("http://localhost:3000/api/proveedores"),
        fetch("http://localhost:3000/api/procesosCompra"),
      ]);

      if (!proveedoresResponse.ok || !procesosResponse.ok) {
        throw new Error("Error al cargar datos.");
      }

      const proveedoresData = await proveedoresResponse.json();
      const procesosData = await procesosResponse.json();

      setProveedores(proveedoresData);
      setProcesosCompra(procesosData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/procesosCompra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el proceso de compra");
      }

      const data = await response.json();
      console.log("Proceso de compra guardado:", data);

      setFormData({ nombre: "", descripcion: "", fecha: "", proveedor_id: "" });
      fetchData(); // Recargar los datos
      alert("Proceso de compra guardado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el proceso de compra:", error);
    }
  };

  const formatFecha = (fecha) => {
    const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString("es-ES", opciones);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="proceso-container">
      <div className="sidebar">
        <h2>Sistema de Gestión</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/inicio")}>Activos</li>
            <li className="active">Procesos de compra</li>
            <li>Mantenimientos</li>
            <li>Reportes</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={onLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className="content">
        <h1>Agregar Proceso de Compra</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Proveedor:</label>
            <select
              name="proveedor_id"
              value={formData.proveedor_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">
              Guardar
            </button>
            <button type="button" className="btn-cancel" onClick={onLogout}>
              Cancelar
            </button>
          </div>
        </form>

        <h2>Procesos de Compra</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Proveedor</th>
            </tr>
          </thead>
         <tbody>
            {procesosCompra.map((proceso) => (
              <tr key={proceso.id}>
                <td>{proceso.id}</td>
                <td>{proceso.nombre}</td>
                <td>{proceso.descripcion}</td>
                <td>{formatFecha(proceso.fecha)}</td>
                <td>{proceso.proveedor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcesoCompras;
