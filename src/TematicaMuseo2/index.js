import React from "react";
import { useNavigate } from "react-router-dom";
import "./TematicaMuseo2.css";
import video1 from "./resources/Alcarrazas_2.mp4";
import video2 from "./resources/Cuencos_2.mp4";
import video4 from "./resources/Urnas_2.mp4";
import video5 from "./resources/Silbatos_2.mp4";
import video3 from "./resources/Volantes_2.mp4";
import FondoRoles from "./resources/fondo1.png";

function TematicaMuseo2({ historia }) {
  const navigate = useNavigate();

  let video;
  switch (historia) {
    case 1:
      video = video1;
      break;
    case 2:
      video = video2;
      break;
    case 3:
      video = video3;
      break;
    case 4:
      video = video4;
      break;
    case 5:
      video = video5;
      break;
    default:
      video = null; // O asigna un video predeterminado o muestra un mensaje de error
  }

  const handleVideoEnd = () => {
    navigate("/museo"); // Ruta de pagina
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

export { TematicaMuseo2 };
