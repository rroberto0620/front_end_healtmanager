/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BuscarPaciente(props){
  const [busqueda, setBusqueda] = useState('');

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    
  };

  return (
    <div className="buscar-paciente-container">
      <h2>Buscar Paciente</h2>
      <input
        type="text"
        placeholder="Buscar paciente"
        value={busqueda}
        onChange={handleBusqueda}
        className="buscar-paciente-input"
      />
      <button type='submit'>Buscar</button>
      <p></p>
      <p></p>
      <Link to="/MedicoPrincipal">
        <button className="btnsalir">Regresar al menú principal</button>
      </Link>
    </div>

  );
}

export default BuscarPaciente;