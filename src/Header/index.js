import "./Header.css";
import back from "./resources/Back-Button.png";
import { Cronometro } from "./Cronometro";
import { Link, useParams } from "react-router-dom";
import { blogdata } from "../blogdata";
import cronometro from "./Reloj/Reloj15.png";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Header(props) {
  const [time, setTime] = useState(600);
  const intervalRef = useRef(null);
  const [initialTime, setInitialTime] = useState(null);

  const fetchTime = async () => {
    try {
      // Obtener el código de la sala
      const response = await axios.get(
        "http://172.16.20.198:3500/time"
      );
      const fetchedTime = response.data[0].time;
      setTime(fetchedTime)

      if (initialTime === null) {
        setInitialTime(fetchedTime); // Establece el tiempo inicial solo la primera vez
      }

      if (time === 1) {
        clearInterval(intervalRef.current);
      }

    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    // Obtener datos de la sala inmediatamente cuando el componente se monta
    fetchTime();

    // Establecer un intervalo para obtener datos
    intervalRef.current = setInterval(fetchTime, 10 * 50);
    console.log(time);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time]);

  // Calcula la duración de la animación en segundos basándote en el tiempo inicial
  const animationDuration = initialTime !== null ? `${initialTime}s` : '0s';


  return (
    <>
      <div className="header">
        <img
          className="animacionCronometroCelular"
          src={cronometro}
          alt="Cronometro"
          style={{
            animationDuration: animationDuration,
            animationPlayState: time !== null && time === 0 ? 'paused' : 'running', // Pausa la animación si el tiempo es 0
          }}
        />
        <Cronometro />
      </div>
    </>
  );
}

export { Header };
