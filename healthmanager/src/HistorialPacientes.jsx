/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
//import './HistorialPacientes.css';
import { Link } from 'react-router-dom';

function HistorialPacientes(props) {
    const [pacientes, setPatientes] = useState([]);
    const [selecPaciente, setSelecPaciente] = useState(null);
    const [preinscripcion, setPreinscripcion] = useState([]);
  
    useEffect(() => {
      fetch('/pacientes')
        .then((response) => response.json())
        .then((data) => setPatientes(data));
    }, []);
  
    const handleViewPatient = (paciente) => {
      setSelecPaciente(paciente);
  
      fetch(`/preinscripcion/${paciente.id}`)
        .then((response) => response.json())
        .then((data) => setSelecPaciente(data));
    };
  
    return (
      <div className="historial-paciente">
        <h2>Historial de Pacientes</h2>
  
        <table className="lista-pacientes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ver Recetas</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>
                  <button onClick={() => handleViewPatient(paciente)}>Ver Recetas</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {selecPaciente && (
          <div className="detatalles-paciente">
            <h2>Datos del Paciente</h2>
            <p>ID: {selecPaciente.id}</p>
            <p>Nombre: {selecPaciente.nombre}</p>
  
            <h2>Prescripcion</h2>
            <table>
              <thead>
                <tr>
                  <th>ID Receta</th>
                  <th>Fecha</th>
                  <th>Medicamento</th>
                  <th>Dosis</th>
                  <th>Instrucciones</th>
                  <th>Firma Médico</th>
                </tr>
              </thead>
              <tbody>
                {preinscripcion.map((preinscripcion) => (
                  <tr key={preinscripcion.id}>
                    <td>{preinscripcion.id}</td>
                    <td>{preinscripcion.fecha}</td>
                    <td>{preinscripcion.medicamento}</td>
                    <td>{preinscripcion.dosis}</td>
                    <td>{preinscripcion.instrucciones}</td>
                    <td>
                      {preinscripcion.firmaMedico && (
                        <img src={preinscripcion.firmaMedico} alt="Firma del Médico" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p></p>
        <Link to="/MedicoPrincipal">
          <button className="btnsalir">Regresar al menú principal</button>
        </Link>
      </div>
    );
  }
  
export default HistorialPacientes;