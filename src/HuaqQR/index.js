import React from "react";
import QRCode from "qrcode.react";
import './HuaqQR.css';

function HuaqQR() {
  return (
    <div className="qr-container">
      {Array.from({ length: 20 }, (_, index) => (
        <div className="qr-code" key={index}>
          <QRCode
            value={`https://smigc.vercel.app/#/HuaqSymbol${index + 1}`}
            size={150} // 150px ≈ 4cm
            fgColor="#000"
          />
        </div>
      ))}
    </div>
  );
}

export { HuaqQR };
