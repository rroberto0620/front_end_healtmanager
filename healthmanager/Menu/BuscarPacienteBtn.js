/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const BuscarPacienteButton = () => {
  return (
    <Link to="/buscar-paciente">
      <button>Buscar paciente</button>
    </Link>
  );
};

export default BuscarPacienteButton;
