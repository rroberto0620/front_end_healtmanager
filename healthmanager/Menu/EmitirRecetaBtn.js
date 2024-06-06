/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const EmitirRecetaButton = () => {
  return (
    <Link to="/receta-medica">
      <button>Emitir receta médica</button>
    </Link>
  );
};

export default EmitirRecetaButton;