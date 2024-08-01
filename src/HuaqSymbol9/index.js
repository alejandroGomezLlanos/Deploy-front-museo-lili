import { useNavigate } from "react-router-dom";
import "./BtnContinuar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import simbolo from "../Traductor/simbolos/simbolo1.png";

function HuaqSymbol9({ historia }) {
  const [rightSymbol, setRightSymbol] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const updateSymbol = async (symbolName) => {
    try {
      const response = await axios.patch(
        "https://testdeploy-production-9d97.up.railway.app/roomCode",
        { symbolName, found: true }
      );
      console.log(`Symbol ${symbolName} updated successfully`);
    } catch (error) {
      console.error(`Error updating symbol ${symbolName}:`, error);
    }
  };

  useEffect(() => {
    checkHistory(historia);
  }, [historia]);

  function checkHistory(historia) {
    console.log(historia);
    let rightsymb = false;
    if (historia === 1) {
      rightsymb = false;
    } else if (historia === 2) {
      rightsymb = false;
    } else if (historia === 3) {
      rightsymb = true;
    } else if (historia === 4) {
      rightsymb = false;
    } else if (historia === 5) {
      rightsymb = false;
    } else {
      console.warn("Unhandled history case: ", historia);
    }
    setRightSymbol(rightsymb);
  }

  const handleButtonClick = () => {
    const isCorrect = rightSymbol;
    if (isCorrect) {
      updateSymbol("Symbol4");
      setPopupMessage("Símbolo Correcto! Serás redirigido...");
    } else {
      setPopupMessage("Símbolo Incorrecto! Serás redirigido...");
    }
    setShowPopup(true);
    setTimeout(() => {
      navigate("/juego/huaquero");
    }, 5000); // Redirigir después de 3 segundos
  };

  return (
    <div>
      <p className="parrafoInferior margen">
        ¿Estás seguro de que quieres escoger este símbolo?
      </p>
      <div className="fondoAmarillo">
        <img
          src={simbolo}
          alt="Confirmation"
          style={{ width: "200px", height: "200px" }}
        />
        <button
          className="btnContinuar"
          onClick={handleButtonClick}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Continuar
        </button>

        {showPopup && (
          <div className="popup">
            <p className="parrafoInferior margen">{popupMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { HuaqSymbol9 };
