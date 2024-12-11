import React, { useState, useEffect } from "react";
import "./AgregarActivo.css";

const AgregarActivo = ({ onClose }) => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [procesosCompra, setProcesosCompra] = useState([]);

  // Cargar ubicaciones y procesos de compra desde el backend
  useEffect(() => {
    fetchUbicaciones();
    fetchProcesosCompra();
  }, []);

  const fetchUbicaciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ubicaciones");
      const data = await response.json();
      setUbicaciones(data);
    } catch (error) {
      console.error("Error al cargar ubicaciones:", error);
    }
  };

  const fetchProcesosCompra = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/procesosCompra");
      const data = await response.json();
      setProcesosCompra(data);
    } catch (error) {
      console.error("Error al cargar procesos de compra:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const activoData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/api/maquinas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activoData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el activo");
      }

      const data = await response.json();
      console.log("Activo guardado:", data);
      onClose();
    } catch (error) {
      console.error("Error al guardar el activo:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar Activo</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tipo Activo:</label>
            <select name="tipo" required>
              <option value="">Seleccione un tipo</option>
              <option value="tipo1">Tipo 1</option>
              <option value="tipo2">Tipo 2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Activo:</label>
            <input type="text" name="nombre" required />
          </div>
          <div className="form-group">
            <label>Marca:</label>
            <input type="text" name="marca" required />
          </div>
          <div className="form-group">
            <label>Modelo:</label>
            <input type="text" name="modelo" required />
          </div>
          <div className="form-group">
            <label>Serie:</label>
            <input type="text" name="serie" required />
          </div>
          <div className="form-group">
            <label>Código de Barras:</label>
            <input type="text" name="codigo_barras" required />
          </div>
          <div className="form-group">
            <label>Responsable:</label>
            <input type="text" name="responsable" required />
          </div>
          <div className="form-group">
            <label>Estado:</label>
            <select name="estado" required>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Proceso de Compra:</label>
            <select name="id_proceso_compra" required>
              <option value="">Seleccione un proceso</option>
              {procesosCompra.map((proceso) => (
                <option key={proceso.id} value={proceso.id}>
                  {proceso.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Color:</label>
            <input type="text" name="color" />
          </div>
          <div className="form-group">
  <label>Ubicación:</label>
  <select name="ubicacion" required>
    <option value="">Seleccione una ubicación</option>
    {ubicaciones.map((ubicacion) => (
      <option key={ubicacion.id} value={ubicacion.id}>
        {ubicacion.nombre}
      </option>
    ))}
  </select>
</div>


          {/* Botones colocados al final */}
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarActivo;
