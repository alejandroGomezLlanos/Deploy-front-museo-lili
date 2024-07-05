import React from 'react';
import simbolo1 from "../Traductor/simbolos/simbolo7.png";
import { useNavigate } from "react-router-dom";

function HuaqSymbol7() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/juego/huaquero'); // Ruta a la que se redirige
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src={simbolo1} alt="Confirmation" style={{ width: '200px', height: '200px' }} />
            <h2>¿Estás seguro de que quieres escoger este símbolo?</h2>
            <button onClick={handleContinue} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Continuar
            </button>
        </div>
    );
};

export { HuaqSymbol7 };
