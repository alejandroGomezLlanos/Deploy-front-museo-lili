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
      return true;
    } catch (error) {
      console.error("Error updating time to 600:", error);
      return false;
    }
  };

  const fetchTime = async () => {
    try {
      const response = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/time"
      );
      const time = response.data.time;
      console.log("Current time from backend:", time);
      return time;
    } catch (error) {
      console.error("Error fetching time:", error);
      return 0;
    }
  };

  useEffect(() => {
    const updateAndFetchTime = async () => {
      const updateSuccess = await updateTime();
      if (updateSuccess) {
        const time = await fetchTime();
        if (time !== 0) {
          setTimeout(() => {
            navigate("/fraseMuseo");
          }, 15000); // Redirige después de 15 segundos
        }
      }
    };

    updateAndFetchTime();
  }, [navigate]);


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
