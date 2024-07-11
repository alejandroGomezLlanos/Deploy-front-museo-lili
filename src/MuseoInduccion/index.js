import React from "react";
import { useNavigate } from "react-router-dom";
import video from "./resources/induccion.mp4";
import FondoRoles from "./resources/fondo1.png";
import "./induccion.css"

function MuseoInduccion() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/animacionMuseo"); // Ruta de pagina
  };

  return (
    <div className="fondo" style={{ backgroundImage: `url(${FondoRoles})` }}>
      <video
        className="video-content"
        controls // Controles ya que no deja reproducir sin una interaccion
        autoPlay
        onEnded={handleVideoEnd}
        src={video}
        type="video/mp4"
      />
    </div>
  );
}

export { MuseoInduccion };
