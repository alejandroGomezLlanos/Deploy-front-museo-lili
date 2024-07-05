import React from 'react';
import simbolo from "../Traductor/simbolos/simbolo11.png";
import { useNavigate } from "react-router-dom";

function HuaqSymbol11() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/juego/huaquero'); // Ruta a la que se redirige
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src={simbolo} alt="Confirmation" style={{ width: '200px', height: '200px' }} />
            <h2>¿Estás seguro de que quieres escoger este símbolo?</h2>
            <button onClick={handleContinue} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Continuar
            </button>
        </div>
    );
};

export { HuaqSymbol11 };
