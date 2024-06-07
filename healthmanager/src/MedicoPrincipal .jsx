/* eslint-disable no-unused-vars */
import {
  Button,
  Box,
  TextField,
  DialogContentText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import "./MedicoPrincipal.css";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
function MedicoPrincipal(props) {
  const navigate = useNavigate();
  const [publicacionesData, setPublicacionesData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [Cargando, setCargando] = useState(false);
  const correoUsuario = window.localStorage.getItem("Usuario");

  const datosUsuario = async () => {
    try {
      const respuesta = await axios.get(
        "http://localhost:4567/datosUsuarioMedico",
        { params: { correo: correoUsuario }}
      );
      console.log("Entrando")
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  const UsuarioData = async () => {
    try {
      const respuesta = await datosUsuario();
      const nombreUsuarioSesion = respuesta.nombreMed;
      const idMedicoUsuarioSesion = respuesta.idMed;
      const cedProfUsuarioSesion = respuesta.cedProf;
      const contactoUsuarioSesion = respuesta.contacto;
      
      window.localStorage.setItem("ID", nombreUsuarioSesion);
      window.localStorage.setItem("IdMed", idMedicoUsuarioSesion);
      window.localStorage.setItem("CedProf", cedProfUsuarioSesion);
      window.localStorage.setItem("Contacto",contactoUsuarioSesion);

      console.log(idMedicoUsuarioSesion)
    } catch (error) {
      console.log("Error en datos del usuario");
      console.log(error);
    }
  };
  UsuarioData();

  const cerrarSesion = () => {
    navigate("/");
  };

  const crearReceta = () => {
    navigate("/RecetaMedica");
  };

  const misPacientes = () => {
    navigate("/MisPacientes");
  };

  const chat = () => {
    navigate("/ChatMed");
  };

  const registrarPacientes = () => {
    navigate("/RegistrarPaciente");
  };

  const editarPaciente = () => {
    navigate("/EditarPaciente");
  };

  const miPerfil = () => {
    navigate("/MiPerfilMedico");
  };


  const usuarioSesion = window.localStorage.getItem("ID");

  const image1 =
    {
      url: "https://media.istockphoto.com/vectors/medical-prescription-and-services-icon-flat-design-long-shadow-vector-id486995030?k=6&m=486995030&s=170667a&w=0&h=BEVyN20V5ul2u3WvHtc7D6QVXK7qrVsLnUn9A_OAmEE=",
      title: "Receta medica",
      width: "23%",
    };

  const image2 =
    {
      url: "https://cdn.icon-icons.com/icons2/2266/PNG/512/crowd_patient_patients_icon_140474.png",
      title: "Mis pacientes",
      width: "23%",
    };

  const image3 =
    {
      url: "https://roianalytics.agency/wp-content/uploads/2020/09/Perfil-de-usuario.png",
      title: "Mi perfil",
      width: "23%",
    };

  const image4 =
    {
      url: "https://static.vecteezy.com/system/resources/previews/003/063/231/non_2x/a-smartphone-with-a-list-of-contacts-chatting-with-friends-vector.jpg",
      title: "Chat",
      width: "23%",
    };

    const image5 =
    {
      url: "https://static.vecteezy.com/system/resources/previews/007/796/592/non_2x/patient-medical-record-flat-icon-for-apps-or-websites-free-vector.jpg",
      title: "Registrar pacientes",
      width: "23%",
    };
    
    const image6 =
    {
      url: "https://th.bing.com/th/id/OIP.pqAA7eV8PNeB7yDAMewlawHaHa?rs=1&pid=ImgDetMain",
      title: "Editar pacientes",
      width: "23%",
    };

    const image7 =
    {
      url: "https://image.freepik.com/vector-gratis/hombre-saliendo-puerta_1133-32.jpg",
      title: "Cerrar sesion",
      width: "23%",
    };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 270,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 20,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <>
      <div id="divPrincipal">
        <h1 id="headerSistema">HealthManager - Menu Principal</h1>
        <div id="division" />
        <div id="divPublicaciones">
          <h1 id="bienvenidoUsuario">¡Hola Medico {usuarioSesion}! </h1>
        </div>
        <div id="division" />
        <div id="divBotones">
          <ImageButton id="img1" focusRipple key={image1.title} style={{width:image1.width,}} onClick={crearReceta}>
          <ImageSrc style={{ backgroundImage: `url(${image1.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image1.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
          </ImageButton>
          <ImageButton  id="img2" focusRipple key={image2.title} style={{width:image2.width,}} onClick={misPacientes}>
          <ImageSrc style={{ backgroundImage: `url(${image2.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image2.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
          </ImageButton>
          <ImageButton id="img3" focusRipple key={image3.title} style={{width:image3.width,}} onClick={miPerfil}>
          <ImageSrc style={{ backgroundImage: `url(${image3.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image3.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
          </ImageButton>
          <ImageButton id="img4" focusRipple key={image4.title} style={{width:image4.width,}} onClick={chat}>
          <ImageSrc style={{ backgroundImage: `url(${image4.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image4.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
          </ImageButton>
          <ImageButton id="img5" focusRipple key={image5.title} style={{width:image5.width,}} onClick={registrarPacientes}>
          <ImageSrc style={{ backgroundImage: `url(${image5.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image5.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
          </ImageButton>
          <ImageButton id="img6" focusRipple key={image6.title} style={{width:image6.width,}} onClick={editarPaciente}>
          <ImageSrc style={{ backgroundImage: `url(${image6.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image6.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
          </ImageButton>
          <ImageButton id="img7" focusRipple key={image7.title} style={{width:image7.width,}} onClick={cerrarSesion}>
          <ImageSrc style={{ backgroundImage: `url(${image7.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image7.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
          </ImageButton>
          
        </div>
      </div>
    </>
  );
}

export default MedicoPrincipal;
