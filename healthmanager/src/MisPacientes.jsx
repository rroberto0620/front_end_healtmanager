/* eslint-disable no-unused-vars */
import { Button, Box, TextField ,DialogContentText, Divider} from "@mui/material"
import axios from "axios"
import {useEffect,useState } from "react"
import './MisPacientes.css'
import { useNavigate } from 'react-router-dom'
import jsPDF from "jspdf"


// eslint-disable-next-line no-unused-vars
function MisPacientes(props) {
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

    const peticionEliminar=async(idPac)=>{
        try {
            const respuesta= await axios.get("http://localhost:4567/eliminarPaciente",{params:{idPac}});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    const procesarEliminacion=async(idPac)=>{
        setCargando(true);
        try {
            const respuesta=await peticionEliminar(idPac);
            console.log("Respuesta de paciente a eliminar", respuesta.data);
            alert("Paciente eliminado",respuesta.data);
            setCargando(false);
        } catch (error) {
            console.log(error);
            alert("Paciente no eliminado");
            setCargando(false);
        }
    }

      
    return (
        <>
            <h1 id="headerFacultad">Health Manager - Mis recetas</h1>
            <div id="division" />
            <nav id="divPublicaciones">
                <h1 id="headerPublicaciones">Mis pacientes</h1>
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
                <p id="leyendaPublicacion">Visualiza tus pacientes.</p>
                <div id="division" />
            </div>
            <div id="listaEliminar">
            <div id="divLista2">
                {publicacionesData.map((elemento) => (
                            <div id="divsPublicaciones2" key={elemento.idPac}>
                            <div className='informacionPublicacion'>
                                        <p id="parrafoNum">Paciente No. ({elemento.idPac})</p>
                                        <Divider id="division2" color="gray"/>
                                        <p id="parrafoMed">Nombre del Paciente: {elemento.nombre}</p>
                                        <p id="parrafoCon">Contacto del Paciente: {elemento.contacto}</p>
                                        <p id="parrafoEdad">Edad del Paciente: {elemento.edad} años</p>
                                        <p id="parrafoCon">Peso del Paciente: {elemento.peso} kg</p>
                                        <p id="parrafoCon">No. de Usuario del Paciente: {elemento.idUsuario}</p>
                                    <Button id="btnDescargar" variant="contained" type="submit" color="warning" onClick={()=>procesarEliminacion(elemento.idPac)}>Eliminar Paciente</Button>
                                    <Divider id="division2" color="gray"/>
                        </div>
                        </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default MisPacientes