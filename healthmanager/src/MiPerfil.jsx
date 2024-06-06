import { Button, Box,DialogContentText, Divider} from "@mui/material"
// eslint-disable-next-line no-unused-vars
import axios from "axios"
// eslint-disable-next-line no-unused-vars
import {useEffect,useState } from "react"
import './MiPerfil.css'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
function MiPerfil(props) {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [Cargando, setCargando] = useState (false)

    //const [miPerfilData, setMiPerfilData] = useState({idUsuario:window.localStorage.getItem("ID"),correo:window.localStorage.getItem("Usuario"),contraseña:window.localStorage.getItem("Contraseña")});

    const regresarPrincipal = () => {
        navigate('/Principal');
    }

    const cerrarSesion = () => {
        navigate('/');
    }

    return (
        <>
            <h1 id="headerFacultad">HealthManager - Mi perfil</h1>
            <div id="division" />
            <nav id="divMiPerfil">
                <h1 id="headerMiPerfil">Mi perfil</h1>
                <div id="divBotonesPerfil">
                <Box m={1}>
                <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
                </Box>
                <Box m={1}>
                <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
                </Box>
                </div>
            </nav>
            <div id="division" />
            <div id="divLeyenda">
                <p id="leyendaPublicacion">Visualiza tu datos como Usuario, Correo y Contraseña.</p>
                <div id="division" />
            </div>
            <div id="divListaPaciente">
                <leyend id="leyendas">Nombre</leyend>
                <DialogContentText id="dialogUsuario" variant="contained" className='contenidoText'>{window.localStorage.getItem("ID")}</DialogContentText>
                <Divider id="divider" color="black"/>
                <leyend id="leyendas">Edad</leyend>
                <DialogContentText id="dialogEdad" variant="contained" className='contenidoText'>{window.localStorage.getItem("Edad")} años</DialogContentText>
                <Divider id="divider" color="black"/>
                <leyend id="leyendas">Peso</leyend>
                <DialogContentText id="dialogPeso" variant="contained" className='contenidoText'>{window.localStorage.getItem("Peso")} kg</DialogContentText>
                <Divider id="divider" color="black"/>
                <leyend id="leyendas">Correo</leyend>
                <DialogContentText id="dialogCorreo" variant="contained" className='contenidoText'>{window.localStorage.getItem("Usuario")}</DialogContentText>
                <Divider id="divider" color="black"/>
                <leyend id="leyendas">Contraseña</leyend>
                <DialogContentText id="dialogContraseña" variant="contained" className='contenidoText'>{window.localStorage.getItem("Contraseña")}</DialogContentText>
                <Divider id="divider" color="black"/>
            </div>
        </>
    )
}

export default MiPerfil