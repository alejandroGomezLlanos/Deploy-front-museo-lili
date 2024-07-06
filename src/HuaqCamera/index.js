import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

function HuaqCamera() {

    const [scanResult, setScanResult] = useState('');

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
        height: 240,
        width: 320,
        borderRadius: '30px', // Añade bordes redondeados
        overflow: 'hidden', // Oculta cualquier contenido que se desborde del contenedor
    };

    return (
        <div>
            <div>
                <p className="parrafoInferior margen">
                    Escanea el código QR. Ten cuidado. Debes escanear el codigo correcto.
                </p>
            </div>

            <div className="fondoAmarillo">
                <QrScanner
                    delay={300}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                <p className="parrafoInferior margen">Resultado del escaneo: {scanResult}</p>
            </div>
        </div>

    );
};

export { HuaqCamera };