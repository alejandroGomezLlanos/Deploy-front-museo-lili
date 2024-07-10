import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./HuaqCamera.css";

function HuaqCamera() {
  const [scanResult, setScanResult] = useState("");
  const [key, setKey] = useState(0);

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
    facingMode: "rear", // Especifica que se use la cámara trasera
  };

  const reloadScanner = () => {
    setKey(prevKey => prevKey + 1);
};

const scannerOptions = {
    key: key, // Utiliza la clave para forzar la recarga
    constraints: {
        video: videoConstraints
    },
    delay: 300,
    style: previewStyle,
    onError: handleError,
    onScan: handleScan
};

  return (
    <div>
      <div>
        <p className="parrafoInferior margen">
          Escanea el código QR. Ten cuidado. Debes escanear el codigo correcto.
        </p>
      </div>

      <div className="fondoAmarillo">
      <QrScanner {...scannerOptions} />
        <p className="parrafoInferior margen">
          Resultado del escaneo: {scanResult}
        </p>
      </div>
    </div>
  );
}

export { HuaqCamera };
