import React, { useState, useEffect } from "react";
import "./RevisarCelular.css";
import celular from "./resource/Celular.png";
import fondo from "./resource/fondo1.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function RevisarCelular() {
  const navigate = useNavigate();

  const updateTime = async () => {
    try {
      const response = await axios.patch(
        "https://testdeploy-production-9d97.up.railway.app/time",
        { time: 600 }
      );
      console.log("Time updated successfully to 600");
    } catch (error) {
      console.error("Error updating time to 600:", error);
    }
  };

  useEffect(() => {
    const handleTimeout = async () => {
      await updateTime(); // Espera a que se complete la actualización del tiempo
      handleSubmit();
    };

    const timer = setTimeout(handleTimeout, 15000); // 15,000 milisegundos = 15 segundos

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
