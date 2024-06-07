/* eslint-disable no-unused-vars */
import { Button, Box, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'


// eslint-disable-next-line no-unused-vars
function Login(props) {
    const navigate = useNavigate();
    const [Cargando, setCargando] = useState (false)
    const [datosLogin, setDatosLogin] = useState( {correo:'', contraseña:''} )

    const hacerPeticion = async () => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.post('http://localhost:4567/validacion',datosLogin)
            console.log("hacerPeticion", response)
            return response;
        } catch (error) {
            throw error
        }
    }

    const esMedico = async () => {
        const correoInput = document.getElementById("correoInput").value;
        try {
          const respuesta = await axios.get(
            "http://localhost:4567/validacionMedico",
            { params: { correo: correoInput }}
          );
          console.log("Entrando")
          return respuesta.data;
        } catch (error) {
        console.log("Error aqui")
          console.log(error);
        }
      };

    window.localStorage.clear();

    const cambiosLogin = (evento) => {
        const {name, value} = evento.target
        setDatosLogin( { ...datosLogin, [name] : value })
    }

    const procesarLogin = async (evento) => {
        const correoInput = document.getElementById("correoInput");
        const contraseñaInput = document.getElementById("contraseñaInput");
        if(correoInput.value === '' || contraseñaInput.value === ''){
            alert("Faltan campos por llenar.")
        }else{
        evento.preventDefault()
        console.log("datos recuperados en el form: ", datosLogin)
        setCargando(true)
        try {
            const response2 = await esMedico()
            console.log(response2.esMedico);
            window.localStorage.setItem('esMedico',response2.esMedico);
            const response = await hacerPeticion()
    
            setCargando(false)
            if (response.data === 'Usuario Correcto') {
                setCargando(true)
                if(response2.esMedico === true){
                    navigate('/MedicoPrincipal');
                    window.localStorage.setItem('Usuario',datosLogin.correo);
                    window.localStorage.setItem('Contraseña',datosLogin.contraseña)
                    setCargando(false)
                }else{
                navigate('/Principal');
                window.localStorage.setItem('Usuario',datosLogin.correo);
                window.localStorage.setItem('Contraseña',datosLogin.contraseña)
                setCargando(false)
                }
            } else {
                alert("Credenciales incorrectas, revisa tu correo o contraseña");
            }
        } catch (error) {
            console.log("error procesar login", error)
            alert("Error de envio al servidor. Intentelo de nuevo porfavor.")
            setCargando(false)
        }
    }
    }

    return (
        <>  
        <div id="divPrincipalLog">
            <h1 className="h1login">HealthManager</h1>
            <p id="p1">Seguimiento medico de pacientes</p>
            <form id="formLogin" onSubmit={ procesarLogin }>
                <h1 className="h1login" id="headerForm">Inicia sesion para continuar</h1>
                <Box m={5}>
                    <TextField id="correoInput" label="Correo" variant="standard" fullWidth onChange={cambiosLogin} name="correo" value={datosLogin.correo}></TextField>
                </Box>
                <Box m={5}>
                    <TextField id="contraseñaInput" label="Contraseña" variant="standard" fullWidth onChange={cambiosLogin} name="contraseña" value={datosLogin.contraseña}></TextField>
                </Box>
                    <Button id="botonEnviar" variant="contained" type="submit" color="primary"  disabled={Cargando}>Iniciar Sesión</Button>
            </form>
            </div>
        </>
    )
}
//<p id="p2">¿Aun no tienes una cuenta? {<Link to="/Registro" className="link_SingUp">Registrarme</Link>}</p>
export default Login