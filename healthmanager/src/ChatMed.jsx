/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Button, Box,DialogContentText, Divider} from "@mui/material"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function ChatMed(props) {
    const usuarioSesion = window.localStorage.getItem("ID");
    var esMedico = window.localStorage.getItem("esMedico");
    const navigate = useNavigate();

    const regresarPrincipal = () => {
        navigate('/MedicoPrincipal')
  }
  const cerrarSesion = () => {
      navigate('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      var webSocket = new WebSocket("ws://localhost:4567/chat");
      webSocket.onmessage = function (msg) { updateChat(msg); };
      webSocket.onclose = function () { alert("Sesion del chat cerrada, se borraron todos los mensaje :(") };
      console.log("CICLO");

      window.onload = function() {
        webSocket.close();
      };
      
      //Send message if "Send" is clicked
      id("send").addEventListener("click", function () {
          sendMessage(id("message").value);
      });
      
      //Send message if enter is pressed in the input field
      id("message").addEventListener("keypress", function (e) {
          if (e.keyCode === 13) { sendMessage(e.target.value); }
      });
      
      //Send a message if it's not empty, then clear the input field
      function sendMessage(message) {
          if (message !== "") {
              webSocket.send(message);
              id("message").value = "";
          }
      }

      id("regresarMenu").addEventListener("click", function () {
        console.log("Entrando aqui");
        webSocket.close();
      });

      id("cerrarSesion").addEventListener("click", function () {
        console.log("Entrando aqui");
        webSocket.close();
      });
      
      //Update the chat-panel, and the list of connected users
      function updateChat(msg) {
          var data = JSON.parse(msg.data);
          insert("chat", data.userMessage);
          id("userlist").innerHTML = "";
          data.userlist.forEach(function (user) {
              insert("userlist", "<li>" + user + "</li>");
          });
      }
      
      //Helper function for inserting HTML as the first child of an element
      function insert(targetId, message) {
          id(targetId).insertAdjacentHTML("afterbegin", message);
      }
      
      //Helper function for selecting element by id
      function id(id) {
          return document.getElementById(id);
      }
    };
    fetchData();
    return () => {
    };
}, [usuarioSesion, navigate]);
  
    return (
      <><h1 id="headerFacultad">HealthManager - Chat</h1><div id="division" /><nav id="divMiPerfil">
        <h1 id="headerMiPerfil">Chat</h1>
        <div id="divBotonesPerfil">
          <Box m={1}>
            <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
          </Box>
          <Box m={1}>
            <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
          </Box>
        </div>
      </nav><div id="division" /><div id="divLeyenda">
          <p id="leyendaPublicacion">Chatea en tiempo real con medicos o pacientes y realiza consultas rapidas.</p>
          <div id="division" />
        </div>
        <div id="divChat">
        <div id="div1">
        <div id="chatControls">
        <textarea id="message" placeholder="Escribe el mensaje...."/>
        <button id="send">Enviar</button>
        </div>
        <div id="chat">   </div>
        </div>
        <div id="div2">
        <p id="parrafo">Lista de usuarios en el chat</p>
        <ul id="userlist"> </ul>
        </div>
        </div>
      </>
        
    );
  }
  
export default ChatMed;