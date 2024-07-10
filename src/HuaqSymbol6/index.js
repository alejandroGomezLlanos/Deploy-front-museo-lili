import React from 'react';
import simbolo from "../Traductor/simbolos/simbolo6.png";
import { useNavigate } from "react-router-dom";

function HuaqSymbol6() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/juego/huaquero'); // Ruta a la que se redirige
    };

    return (
        <>
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
              onClick={handleContinue}
              style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
            >
              Continuar
            </button>
          </div>
        </>
      );
};

export { HuaqSymbol6 };
