/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Box, TextField ,DialogContentText, Divider} from "@mui/material"
import './RegistrarPaciente.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function RegistrarPaciente(props){
  const esMedico = false;
  const navigate = useNavigate();

  const [datosUsuario,setDatosUsuario] = useState({
    correo:'',
    contraseña:'',
    esMedico:esMedico,
  })

  const [Cargando, setCargando] = useState (false)


  const hacerPeticion=async()=>{
    try{
        const respuesta= await axios.post("http://localhost:4567/AgregarUsuario",datosUsuario);
        console.log(respuesta.data);
        return respuesta.data;
    }catch(error){
        throw error;
    }
}

const procesarFormulario= async (evento)=>{
    evento.preventDefault();
    console.log("Datos recuperados del evento: ", datosUsuario);
    setCargando(true);
    try{
        console.log("Entrando try");
        const respuesta=await hacerPeticion();
        setCargando(false);
        if(respuesta==='Usuario agregado'){
            document.getElementById('correoI').value = ''
            document.getElementById('contraseñaI').value = ''
            alert("Se registro paciente");
        }else{
            alert("El registro no se realizo :(");
            console.log("El registro no se realizo");
        }
    }catch(error){
        setCargando(false);
    }
}

const cambiosFormulario=(evento)=>{
    const {name,value} =evento.target;
    setDatosUsuario({
        ...datosUsuario,  
        [name]: value 
    })
}

const regresarPrincipal = () => {
  navigate('/MedicoPrincipal');
}

const cerrarSesion = () => {
  navigate('/');
}
  return (
    <><h1 id="headerFacultad">Health Manager - Registrar Paciente</h1><div id="division" /><nav id="divPublicaciones">
      <h1 id="headerPublicaciones">Registrar Paciente</h1>
      <div id="divBotonesRecetas">
        <Box id="box1" m={0}>
          <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
        </Box>
        <Box id="box2" m={0}>
          <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
        </Box>
      </div>
    </nav><div id="division" /><div id="divLeyenda">
        <div id="division" />
      </div><div className="paciente-container">
        <form onSubmit={procesarFormulario} className="paciente-form">
          <p>Datos del Paciente</p>
          <input
            id="correoI"
            type="text"
            name="correo"
            placeholder="Correo electronico"
            onChange={cambiosFormulario} />
          <input
            id="contraseñaI"
            type="text"
            name="contraseña"
            placeholder="Contraseña"
            onChange={cambiosFormulario} />
          <button type="submit">Registrar paciente</button>
        </form>
        <p></p>
      </div></>
  );
}

export default RegistrarPaciente;