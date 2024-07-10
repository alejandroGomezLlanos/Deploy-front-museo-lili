import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./HuaqCamera.css";

function HuaqCamera() {
  const [scanResult, setScanResult] = useState("");

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      window.location.href = data.text; // Redirige a la URL absoluta
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: "50%",
    maxwidth: "50%",
    width: "auto",
    borderRadius: "30px", // Añade bordes redondeados
    overflow: "hidden", // Oculta cualquier contenido que se desborde del contenedor
  };

  const videoConstraints = {
    facingMode: "rear" // Especifica que se use la cámara trasera
};

  return (
    <div>
      <div>
        <p className="parrafoInferior margen">
          Escanea el código QR. Ten cuidado. Debes escanear el codigo correcto.
        </p>
      </div>

      <div className="fondoAmarillo">
        <div>
          <QrScanner
            delay={301}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            constrains={videoConstraints}
          />
          <p className="parrafoInferior margen">
            Resultado del escaneo: {scanResult}
          </p>
        </div>
      </div>
    </div>
  );
}

export { HuaqCamera };
