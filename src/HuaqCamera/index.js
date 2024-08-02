import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./HuaqCamera.css";
import { Header } from "../Header";
import { useNavigate } from "react-router-dom";

function HuaqCamera() {
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      window.location.href = data.text; // Navega a la URL escaneada
    }
  };

  const handleError = (err) => {
    console.error("Error de escaneo:", err);
  };

  const previewStyle = {
    width: "100vw",
    height: "100vh",
    borderRadius: "30px",
    overflow: "hidden",
  };

  const videoConstraints = {
    video: { facingMode: "environment" },
  };

  const handleClick = () => {
    navigate("/HuaqConf");
  };

  // SCANNER //
  const [scanResult, setScanResult] = useState("");

  return (
    <div>
      <Header />
      <div>
        <h1 className="parrafoInferior1 margen">Escanea el QR.</h1>
        <p className="parrafoInferior2">
          Cuando tengas todos los símbolos, pulsa el botón.
        </p>
      </div>
      <div className="fondoAmarillo">
        <QrScanner
          delay={301}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          constraints={videoConstraints}
        />
        <div className="container">
          <p className="parrafoInferior2 margen">¿Terminaste? Pulsa el botón</p>
          <button onClick={handleClick} className="btnContinuar">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export { HuaqCamera };
