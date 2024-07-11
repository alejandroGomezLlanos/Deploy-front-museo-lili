import React, { useState, useEffect } from "react";
import "./RevisarCelular.css";
import celular from "./resource/Celular.png";
import fondo from "./resource/fondo1.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function RevisarCelular() {
  const navigate = useNavigate();

  const updateTime = async (time) => {
    try {
      const response = await axios.patch(
        "http://172.16.20.198:3500/time",
        { time: 600 }
      );
      console.log(`Time updated successfully to ${time}`);
    } catch (error) {
      console.error(`Error updating time ${time}:`, error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit();
      updateTime();
    }, 15000); // 15,000 milisegundos = 15 segundos

    return () => {
      clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes de que se cumplan los 15 segundos
    };
  }, []);

  const handleSubmit = (e) => {
    navigate("/fraseMuseo");
  };

  return (
    <div className="cont-infocel" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="informacionCelular">
        <h1>¡Viajeros!</h1>
        <p>Revisen sus celulares para continuar con la experiencia.</p>
        <img className="image" src={celular} alt="Super" />
      </div>
    </div>
  );
}

export { RevisarCelular };
