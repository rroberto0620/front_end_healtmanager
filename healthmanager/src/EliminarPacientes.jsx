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
    const [publicacionesData, setPublicacionesData] = useState([]);
    const [Cargando, setCargando] = useState (false)
    const [datosID, setDatosID] = useState( {idPublicacion:''} )
    const nombreUsuario = window.localStorage.getItem("IDUsuario");

    const cambiosID = (evento) => {
        const {name, value} = evento.target
        setDatosID( { ...datosID, [name] : value })
    }

    const regresarPrincipal = () => {
        navigate('/MedicoPrincipal');
    }

    const cerrarSesion = () => {
        navigate('/');
    }

    const obtenerListaMisPublicaciones = async () => {
        try {
            const response = await axios.get("http://localhost:4567/MisPacientes", { params: { idUsuario: nombreUsuario } });
            console.log(response.data)
            console.log(nombreUsuario)
            setPublicacionesData(response.data);
        } catch (error) {
            console.error('Error al obtener el id del usuario:', error);
        }
    };
    obtenerListaMisPublicaciones()

    const peticionEliminar=async()=>{
        try {
            const respuesta= await axios.post("https://back-endproyectofinal8-production-a397.up.railway.app/eliminarPublicacion",{params:{idPublicacion:window.localStorage.getItem("idePublicacion")}});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    const procesarEliminacion=async()=>{
        setCargando(true);
        try {
            const respuesta=await peticionEliminar();
            console.log("Respuesta de publicacion a eliminar", respuesta.data);
            alert("Publicacion eliminada",respuesta.data);
            setCargando(false);
        } catch (error) {
            console.log(error);
            setCargando(false);
        }
    }
      
    return (
        <>
            <h1 id="headerFacultad">Health Manager - Mis recetas</h1>
            <div id="division" />
            <nav id="divPublicaciones">
                <h1 id="headerPublicaciones">Mis publicaciones</h1>
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
                <p id="leyendaPublicacion">Elimina tus pacientes.</p>
                <div id="division" />
            </div>
    
        </>
    )
}

export default DescargaRecetas