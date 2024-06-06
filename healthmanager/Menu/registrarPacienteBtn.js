/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const RegistrarPacienteButton = () => {
  return (
    <Link to="/registrar-paciente">
      <button>Registrar paciente</button>
    </Link>
  );
};

export default RegistrarPacienteButton;
