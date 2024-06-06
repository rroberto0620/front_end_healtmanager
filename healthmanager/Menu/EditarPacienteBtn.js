/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const EditarPacienteButton = () => {
  return (
    <Link to="/editar-paciente">
      <button>Editar paciente</button>
    </Link>
  );
};

export default EditarPacienteButton;