import React from "react";
import { useNavigate } from "react-router-dom";
import "./TematicaMuseo.css";
import video from "./resources/Alcarrazas.mp4";
import FondoRoles from "./resources/fondo1.png";

function TematicaMuseo() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/rolesMuseo"); // Ruta de pagina
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

export { TematicaMuseo };
