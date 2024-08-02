import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./QrMuseo.css";
import fondo from "./resources/QrMuseo.png";
import refresh from "./resources/Refresh.png";
import QRCode from "qrcode.react";
import axios from "axios";

function QrMuseo() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [isRoomFull, setIsRoomFull] = useState(false);
  const [isRoomCodeUpdated, setIsRoomCodeUpdated] = useState(false);

  const intervalRef = useRef(null);

  const fetchRoomData = async () => {
    try {
      // Obtener el código de la sala
      const roomResponse = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/roomCode"
      );
      setRoomCode(roomResponse.data[0].code);

      // Obtener el recuento de usuarios
      const userResponse = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/users"
      );
      const users = userResponse.data;
      const count = users.filter((user) => user.codigoSala === roomCode).length;
      setUserCount(count);

      // Limpiar el intervalo si el recuento de usuarios llega a 4
      if (count === 4) {
        setIsRoomFull(true);
        clearInterval(intervalRef.current);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    if (isRoomCodeUpdated) {
      // Obtener datos de la sala inmediatamente cuando el componente se monta
      fetchRoomData();
  
      // Establecer un intervalo para obtener datos de la sala cada 10 segundos
      intervalRef.current = setInterval(fetchRoomData, 3 * 1000);
  
      // Limpiar el intervalo cuando el componente se desmonta
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [isRoomCodeUpdated, roomCode, userCount]);

  // Redireccionar a /tematicaMuseo cuando la sala está llena
  useEffect(() => {
    if (isRoomFull) {
      navigate("/tematicaMuseo");
    }
  }, [isRoomFull, navigate]);

  // Función para generar un código de sala aleatorio de 4 caracteres
  const generateRoomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  };

  // Función para actualizar o crear un nuevo código de sala en la base de datos
  const updateRoomCode = async () => {
    try {
      const newCode = generateRoomCode();
      const response = await axios.put(
        "https://testdeploy-production-9d97.up.railway.app/roomcode",
        {
          code: newCode,
          huaqueroSymbols: []
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsRoomCodeUpdated(true);
      console.log(`Room code updated to: ${newCode}`);
      
    } catch (error) {
      console.error("Error updating room code:", error);
    }
  };

  // Llamar a la función para actualizar el código de sala al cargar la página
  useEffect(() => {
    updateRoomCode();
  }, []);

  return (
    <div
      className="container-qr-museo"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="texto-contenedor">
        <div className="texto-informacion">
          <div className="linea-texto">Lee el código QR e ingresa</div>
          <div className="linea-texto">el código de la sala.</div>
        </div>

        <div className="imagenes-contenedor">
          <div className="cuadro-contenedor">
            {roomCode && (
              <>
                <QRCode
                  value="https://smigc.vercel.app/"
                  size={300}
                  bgColor="#c98686"
                  fgColor="#000"
                />
                <div className="room-code">{roomCode}</div>
              </>
            )}
          </div>
        </div>
        <div className="texto-informacion-contador">{userCount}/4</div>
      </div>
    </div>
  );
}

export { QrMuseo };
