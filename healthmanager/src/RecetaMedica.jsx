/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import React, { useId, useState } from 'react';
import './RecetaMedica.css';
import { Button, Box, TextField ,DialogContentText, Divider} from "@mui/material"
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import jsPDF from "jspdf"

function RecetaMedica(props){
  const fechaActual = new Date();
  const navigate = useNavigate();
  const mes = fechaActual.getMonth()+1;
  const nombreMed = window.localStorage.getItem("ID");
  const contactoMed = window.localStorage.getItem("Usuario");
  const idMed = window.localStorage.getItem("IdMed");
  const firmaMed = "nohayfirma"
  const [datosReceta, setdatosReceta] = useState( {
    nombreMed:nombreMed,
    firmaMed:firmaMed,
    contactoMed:contactoMed,
    pesoPac:'',
    edadPac:'',
    fecha:fechaActual.getFullYear()+"/"+mes+"/"+fechaActual.getDate(),
    presArt:'',
    tempPac:'',
    contenido:'',
    idPaciente:'',
    idMedico:idMed,
    })
  const [Cargando, setCargando] = useState (false)

    const hacerPeticion=async()=>{
        try{
            const respuesta= await axios.post("http://localhost:4567/realizarReceta",datosReceta);
            console.log(respuesta.data);
            return respuesta.data;
        }catch(error){
            throw error;
        }
    }

    const procesarFormulario= async (evento)=>{
        evento.preventDefault();
        console.log("Datos recuperados del evento: ", datosReceta);
        setCargando(true);
        try{
            const respuesta=await hacerPeticion();
            setCargando(false);
            if(respuesta==='Receta creada'){
                generarPdf(nombreMed,contactoMed,fechaActual.getFullYear()+"/"+mes+"/"+fechaActual.getDate());
                document.getElementById('idPaciente').value = ''
                document.getElementById('pesoPac').value = ''
                document.getElementById('edadPac').value = ''
                document.getElementById('presArt').value = ''
                document.getElementById('tempPac').value = ''
                document.getElementById('textArea').value = ''
                alert("Se realizo la receta :)");
            }else{
                alert("La receta no se realizo :(");
                console.log("La receta no se realizo");
            }
        }catch(error){
            setCargando(false);
        }
    }

    const cambiosFormulario=(evento)=>{
        const {name,value} =evento.target;
        setdatosReceta({
            ...datosReceta,  
            [name]: value 
        })
    }

    const generarPdf = (idReceta, nombreMedico, contactoMedico, fecha) => {
      const hora = new Date().getTime;
      const doc = new jsPDF();
      const docWidth = doc.internal.pageSize.getWidth();
    
      var logo = new Image();
      logo.src = 'src/assets/medicos.png';
      doc.addImage(logo, 'JPEG', 10, 10, 45, 45);
    
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      const tituloX = 70;
      const tituloY = 15;
      doc.text(`Receta No. ${idReceta}`, tituloX, tituloY);
    
      const lineaY = tituloY + 6;
      doc.line(tituloX - 5, lineaY, docWidth - 10, lineaY);
    
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const contenidoX = tituloX;
      const contenidoY = lineaY + 10;
      const separacionLineas = 8;
    
      doc.text(`Medico: ${nombreMedico}`, contenidoX, contenidoY);
      doc.text(`Contacto: ${contactoMedico}`, contenidoX, contenidoY + separacionLineas);
      doc.text(`Fecha: ${fecha}`, contenidoX, contenidoY + separacionLineas * 2);
    
      const camposY = contenidoY + separacionLineas * 4;
      doc.setFontSize(10);
      doc.text('Paciente: ', 10, camposY);
      doc.text('Edad:', 60, camposY);
      doc.text('Diagnostico:', 10, camposY + 10);
      doc.text('Fecha:', 60, camposY + 10);

      var logo2 = new Image();
      logo2.src = 'src/assets/firma.png';
      doc.addImage(logo2, 'JPEG', 80, camposY + 40, 45, 45);
    
      doc.save(`Receta_${fecha}${hora}.pdf`);
    };

    const regresarPrincipal = () => {
      navigate('/MedicoPrincipal');
  }

  const cerrarSesion = () => {
      navigate('/');
  }

  return (
    <>
      <div id="divPrincipal">
      <h1 id="headerFacultad">HealthManager - Receta Medica</h1><div id="division" /><nav id="divPublicaciones">
      <h1 id="headerPublicaciones">Receta medica</h1>
      <div id="divBotonesRecetas">
        <Box id="box1" m={0}>
          <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
        </Box>
        <Box id="box2" m={0}>
          <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
        </Box>
      </div>
    </nav><div id="division" /><div className="receta-medica-container">
        <form onSubmit={procesarFormulario} className="receta-medica-form">
          <p>Datos de la Receta</p>
          <input
            id="idPaciente"
            type="text"
            placeholder='ID del paciente'
            name="idPaciente"
            onChange={cambiosFormulario} />
          <input
            id="pesoPac"
            type="text"
            placeholder='Peso'
            name="pesoPac"
            onChange={cambiosFormulario} />
          <input
            id="edadPac"
            type="text"
            placeholder='Edad'
            name="edadPac"
            onChange={cambiosFormulario} />
          <input
            id="presArt"
            type="text"
            placeholder='Presion arterial'
            name="presArt"
            onChange={cambiosFormulario} />
          <input
            id="tempPac"
            type="text"
            placeholder='Temperatura'
            name="tempPac"
            onChange={cambiosFormulario} />
          <textarea
            id="textArea"
            placeholder="Escriba la prescripción médica"
            name="contenido"
            onChange={cambiosFormulario} />
          <button type="submit">Emitir receta</button>
        </form>
      </div>
      </div></>
  );
}

export default RecetaMedica;