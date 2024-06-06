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
import "./Principal.css";
import { useNavigate } from "react-router-dom";
function Principal(props) {
  const navigate = useNavigate();
  const correoUsuario = window.localStorage.getItem("Usuario");
  const usuarioSesion = window.localStorage.getItem("ID");

  const datosUsuario = async () => {
    try {
      const respuesta = await axios.get(
        "http://localhost:4567/datosUsuario",
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
      const nombreUsuarioSesion = respuesta.nombre;
      const edadUsuarioSesion = respuesta.edad;
      const pesoUsuarioSesion = respuesta.peso;
      const idUsuarioSesion = respuesta.idUsuario;
      
      window.localStorage.setItem("ID", nombreUsuarioSesion);
      window.localStorage.setItem("Edad", edadUsuarioSesion);
      window.localStorage.setItem("Peso", pesoUsuarioSesion);
      window.localStorage.setItem("IDUsuario",idUsuarioSesion)

      console.log(idUsuarioSesion)
    } catch (error) {
      console.log("holaa");
      console.log(error);
    }
  };
  UsuarioData();

  const image1 =
    {
      url: "https://www.meditips.com/wp-content/uploads/2019/03/recetas-medicas-1200x600-1.jpg",
      title: "Mis recetas",
      width: "32%",
    };

  const image2 =
    {
      url: "https://roianalytics.agency/wp-content/uploads/2020/09/Perfil-de-usuario.png",
      title: "Mi perfil",
      width: "32%",
    };

  const image3 =
    {
      url: "https://image.freepik.com/vector-gratis/hombre-saliendo-puerta_1133-32.jpg",
      title: "Cerrar sesion",
      width: "32%",
    };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 80,
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

  const cerrarSesion = () => {
    navigate("/");
  };

  const misRecetas = () => {
    navigate("/DescargaRecetas");
  };

  const miPerfil = () => {
    navigate("/MiPerfil");
  };

  return (
    <>
      <div id="divPrincipal">
        <h1 id="headerSistema">HealthManager - Menu Principal</h1>
        <div id="division" />
        <div id="divPublicaciones">
          <h1 id="bienvenidoUsuario">¡Hola {usuarioSesion}! </h1>
        </div>
        <div id="division" />
        <div id="divBotones">
          <ImageButton id="img1" focusRipple key={image1.title} style={{width:image1.width,}} onClick={misRecetas}>
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
          <ImageButton  id="img2" focusRipple key={image2.title} style={{width:image2.width,}} onClick={miPerfil}>
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
          <ImageButton id="img3" focusRipple key={image3.title} style={{width:image3.width,}} onClick={cerrarSesion}>
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
        </div>
      </div>
    </>
  );
}

export default Principal;
