import React, { useState, useEffect } from "react";
import "./intentaloDenuevo.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import cronometro from "../Header/Reloj/Reloj15.png";
import fondo from "./resource/sad.png";
import { useNavigate } from "react-router-dom";

function IntentaloDenuevo({ historia }) {
  const navigate = useNavigate();

  const handleContinuarClick = () => {
    // Redirigir a la página /museo al hacer clic en el botón "Salir"
    navigate("/museoTablaMejorT");
  };
  return (
    <div className="contIntentalo" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="divIntentalo">
        <h1>Inténtalo de nuevo</h1>
        <button className="btnContinuar" onClick={handleContinuarClick}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export { IntentaloDenuevo };
