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

  const intervalRef = useRef(null);

  const fetchRoomData = async () => {
    try {
      // Obtener el código de la sala
      const roomResponse = await axios.get("https://testdeploy-production-9d97.up.railway.app/roomCode");
      setRoomCode(roomResponse.data[0].code);

      // Obtener el recuento de usuarios
      const userResponse = await axios.get("https://testdeploy-production-9d97.up.railway.app/users");
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
    // Obtener datos de la sala inmediatamente cuando el componente se monta
    fetchRoomData();

    // Establecer un intervalo para obtener datos de la sala cada 10 segundos
    intervalRef.current = setInterval(fetchRoomData, 3 * 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [roomCode, userCount]);


  // Redireccionar a /tematicaMuseo cuando la sala está llena
  useEffect(() => {
    if (isRoomFull) {
      navigate("/tematicaMuseo");
    }
  }, [isRoomFull, navigate]);

  return (
    <div className="container-qr-museo" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="texto-contenedor">
        <div className="texto-informacion">
          <div className="linea-texto">Lee el código QR o ingresa</div>
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
