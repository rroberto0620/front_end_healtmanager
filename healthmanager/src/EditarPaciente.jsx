/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './EditarPaciente.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button, Box, TextField ,DialogContentText, Divider} from "@mui/material"
import { useNavigate } from 'react-router-dom'

function EditarPaciente(props) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [contacto, setContacto] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const regresarPrincipal = () => {
    navigate('/MedicoPrincipal');
}

const cerrarSesion = () => {
    navigate('/');
}

  return (
    <><h1 id="headerFacultad">HealthManager - Editar Pacientes</h1><div id="division" /><nav id="divPublicaciones">
      <h1 id="headerPublicaciones">Editar Pacientes</h1>
      <div id="divBotonesRecetas">
        <Box id="box1" m={0}>
          <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
        </Box>
        <Box id="box2" m={0}>
          <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
        </Box>
      </div>
    </nav><div id="division" /><div id="divLeyenda">
        <p id="leyendaPublicacion">Edita los datos de un paciente.</p>
        <div id="division" />
      </div><div className="editar-paciente-container">
        <form onSubmit={handleSubmit} className="editar-paciente-form">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)} />
          <input
            type="text"
            placeholder="Peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)} />
          <input
            type="text"
            placeholder="Contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)} />
          <button type="submit">Guardar cambios</button>
        </form>
        <p></p>
      </div></>
  );
}

export default EditarPaciente;