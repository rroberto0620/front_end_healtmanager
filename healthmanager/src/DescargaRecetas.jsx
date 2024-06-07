/* eslint-disable no-unused-vars */
import { Button, Box, TextField ,DialogContentText, Divider} from "@mui/material"
import axios from "axios"
import {useEffect,useState } from "react"
import './DescargaRecetas.css'
import { useNavigate } from 'react-router-dom'
import jsPDF from "jspdf"


// eslint-disable-next-line no-unused-vars
function DescargaRecetas(props) {
    const navigate = useNavigate();
    const [recetasData, setRecetasData] = useState([]);
    const nombreUsuario = window.localStorage.getItem("IDUsuario");
    
    const regresarPrincipal = () => {
        navigate('/Principal');
    }

    const cerrarSesion = () => {
        navigate('/');
    }

    const obtenerListaMisRecetas = async () => {
        try {
            const response = await axios.get("http://localhost:4567/MisRecetas", { params: { idUsuario: nombreUsuario } });
            console.log(response.data)
            console.log(nombreUsuario)
            setRecetasData(response.data);
        } catch (error) {
            console.error('Error al obtener el id del usuario:', error);
        }
    };
    obtenerListaMisRecetas()
   
    const generarPdf = (idReceta, nombreMedico, contactoMedico, fecha) => {
        const hora = new Date();
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
        doc.text('Paciente:', 10, camposY);
        doc.text('Edad:', 60, camposY);
        doc.text('Diagnostico:', 10, camposY + 10);
        doc.text('Fecha:', 60, camposY + 10);

        var logo2 = new Image();
        logo2.src = 'src/assets/firma.png';
        doc.addImage(logo2, 'JPEG', 80, camposY + 40, 45, 45);
      
        doc.save(`Receta_${hora}.pdf`);
      };
      
    return (
        <>
            <h1 id="headerFacultad">HealthManager - Mis recetas</h1>
            <div id="division" />
            <nav id="divPublicaciones">
                <h1 id="headerPublicaciones">Mis recetas</h1>
                <div id="divBotonesRecetas">
                <Box id="box1" m={0}>
                <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
                </Box>
                <Box id="box2" m={0}>
                <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
                </Box>
                </div>
            </nav>
            <div id="division" />
            <div id="divLeyenda">
                <p id="leyendaPublicacion">Visualiza tus recetas.</p>
                <div id="division" />
            </div>
            <div id="listaEliminar">
            <div id="divLista2">
                {recetasData.map((elemento) => (
                            <div id="divsPublicaciones2" key={elemento.idRec}>
                        <div className='informacionPublicacion'>
                                    <p id="parrafoNum">Receta No. ({elemento.idRec})</p>
                                    <Divider id="division2" color="gray"/>
                                    <p id="parrafoMed">Medico emisor: {elemento.nombreMed}</p>
                                    <p id="parrafoCon">Contacto del medico: {elemento.contactoMed}</p>
                                    <p id="parrafoFecha"className='parrafoFecha'>Fecha de emision: {elemento.fecha}</p>
                                    <Button id="btnDescargar" variant="contained" type="submit" color="warning" onClick={()=>generarPdf(elemento.idRec,elemento.nombreMed,elemento.contactoMed,elemento.fecha)}>Descargar</Button>
                                    <Divider id="division2" color="gray"/>
                        </div>
                        </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default DescargaRecetas