import "./esperarCelular.css";
import simbolo1 from "../Traductor/simbolos/simbolo1.png";
import simbolo2 from "../Traductor/simbolos/simbolo2.png";
import simbolo3 from "../Traductor/simbolos/simbolo3.png";
import simbolo4 from "../Traductor/simbolos/simbolo4.png";
import simbolo5 from "../Traductor/simbolos/simbolo5.png";
import simbolo6 from "../Traductor/simbolos/simbolo6.png";
import simbolo7 from "../Traductor/simbolos/simbolo7.png";
import simbolo8 from "../Traductor/simbolos/simbolo8.png";
import simbolo9 from "../Traductor/simbolos/simbolo9.png";
import simbolo10 from "../Traductor/simbolos/simbolo10.png";
import simbolo11 from "../Traductor/simbolos/simbolo11.png";
import simbolo12 from "../Traductor/simbolos/simbolo12.png";
import simbolo13 from "../Traductor/simbolos/simbolo13.png";
import simbolo14 from "../Traductor/simbolos/simbolo14.png";
import simbolo15 from "../Traductor/simbolos/simbolo15.png";
import simbolo16 from "../Traductor/simbolos/simbolo16.png";
import simbolo17 from "../Traductor/simbolos/simbolo17.png";
import simbolo18 from "../Traductor/simbolos/simbolo18.png";
import simbolo19 from "../Traductor/simbolos/simbolo19.png";
import simbolo20 from "../Traductor/simbolos/simbolo20.png";
import logoU from "./resources/logoU.png";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function EsperarCelular({ historia }) {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Deshabilita el botón durante 1 minuto (60000 ms)
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 60000);

    // Limpieza del temporizador cuando el componente se desmonta
    return () => clearTimeout(timer);
  }, []);
  
  const getImagesForHistoria = (historia) => {
    switch (historia) {
      case 1:
        return [simbolo1, simbolo2, simbolo3, simbolo4];
      case 2:
        return [simbolo5, simbolo6, simbolo7, simbolo8];
      case 3:
        return [simbolo9, simbolo10, simbolo11, simbolo12];
      case 4:
        return [simbolo13, simbolo14, simbolo15, simbolo16];
      case 5:
        return [simbolo17, simbolo18, simbolo19, simbolo20];
      default:
        return [];
    }
  };

  const handleClick = () => {
    navigate("/introduccion");
  };

  // Obtener las imágenes según la historia
  const images = getImagesForHistoria(historia);

  return (
    <div>
      <div className="contenedor">
        <h1 className="title">Viajero, espera...</h1>
        <p className="text12">Observa la temática del día</p>
        <p className="text12">y no pierdas de vista su</p>
        <p className="textred">Simbología...</p>
      </div>
      <div className="fourimg">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagen ${index + 1}`}
            className="responsive-img"
          />
        ))}
      </div>
      <div className="contenedor">
        <button
          onClick={handleClick}
          disabled={isDisabled}
          className="buttonContinuar"
        >
          {isDisabled ? 'Continuar' : 'Continuar'}
        </button>
      </div>
      <img alt="Logo Museo" src={logoU} className="logo" />
    </div>
  );
}

export { EsperarCelular };
