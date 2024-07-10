import React, { useEffect, useState, useRef } from "react";
import "./Cronometro.css";
import cronometro from "./Reloj/Reloj15.png";
import { useMyContext } from "../SeleccionCargando/MyContext";
import Modal from "react-modal";
import StarRatings from "react-star-ratings";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Cronometro() {
  const { setTiempoInicial } = useMyContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [lostModalIsOpen, setLostModalIsOpen] = useState(false); // Agregamos un nuevo estado para el modal de "Perdiste"
  const navigate = useNavigate();
  const [time, setTime] = useState(600);
  const intervalRef = useRef(null);

  const fetchTime = async () => {
    try {
      // Obtener el código de la sala
      const response = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/time"
      );
      setTime(response.data[0].time);

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

    if (time === 0) {
      setLostModalIsOpen(true);
    }

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time]);


  const handleSubmit = () => {
    // Aquí puedes enviar la calificación (rating) y el comentario (comment) al servidor o realizar otras acciones necesarias.
    // Luego, cierra el modal actual.

    navigate("/pierden");
  };

  return (
    <>
      {/* Modal para "Perdiste" */}
      <Modal
        isOpen={lostModalIsOpen}
        onRequestClose={() => setLostModalIsOpen(false)}
        contentLabel="Perdiste Modal"
        className="modal-inicial"
      >
        <h2>Misión Fallida</h2>
        <p>El tiempo se terminó</p>
        <p>0:00</p>
        <button className="btnContinuar" onClick={handleSubmit}>
          Continuar
        </button>
      </Modal>
    </>
  );
}

export { Cronometro };
