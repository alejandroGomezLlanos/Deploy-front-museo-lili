import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RolesMuseo.css";
import GuiaLogo from "./resources/logoGuia.png";
import HuaqueroLogo from "./resources/logoHuaquero.png";
import InterpreteLogo from "./resources/logoInterprete.png";
import AntropologoLogo from "./resources/logoAntropologo.png";
import FondoRoles from "./resources/FondoRoles.png";
import NarracionGuia from "./resources/NarracionGuia.mp3";
import NarracionHuaquero from "./resources/NarracionHuaquero.mp3";
import NarracionInterprete from "./resources/NarracionInterprete.mp3";
import NarracionAntropologo from "./resources/NarracionAntro.mp3";

const roles = [
  {
    titulo: "Guía",
    descripcion:
      "Deberás observar detalladamente el mapa.",
    logo: GuiaLogo,
    audio: NarracionGuia,
  },
  {
    titulo: "Huaquero",
    descripcion:
      "Escanea el código QR.",
    logo: HuaqueroLogo,
    audio: NarracionHuaquero,
  },
  {
    titulo: "Intérprete",
    descripcion:
      "Encuentra los pares.",
    logo: InterpreteLogo,
    audio: NarracionInterprete,
  },
  {
    titulo: "Antropólogo",
    descripcion:
      "Resuelve el anagrama.",
    logo: AntropologoLogo,
    audio: NarracionAntropologo,
  },
];

function RolesMuseo() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [audioCounter, setAudioCounter] = useState(0);

  const playAudioInSequence = async () => {
    for (const role of roles) {
      const audio = new Audio(role.audio);
      setActiveRole(role.titulo);
      await new Promise((resolve) => {
        audio.onended = () => {
          resolve();
          setAudioCounter((prevCounter) => prevCounter + 1);
        };
        audio.play();
      });
    }
    setActiveRole("");
  };

  const startSequence = () => {
    setIsStarted(true);
    playAudioInSequence();
  };

  useEffect(() => {
    if (audioCounter === roles.length) {
      navigate("/estadoMuseo");
    }
  }, [audioCounter, navigate]);

  return (
    <div className="roles-section" style={{ backgroundImage: `url(${FondoRoles})` }}>
      <h1>¡Seleccionen sus roles, viajeros!</h1>
      <h3>Estamos a punto de comenzar.</h3>
      <div className="roles-container">
        {roles.map((rol, index) => (
          <div key={index} className="role">
            <h2>{rol.titulo}</h2>
            <div className="role-content">
              <img
                src={rol.logo}
                alt={rol.titulo}
                className={activeRole === rol.titulo ? "rotating" : ""}
              />
              <p>{rol.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
      {!isStarted && (
        <button className="start-button" onClick={startSequence}>
          Comenzar
        </button>
      )}
    </div>
  );
}

export { RolesMuseo };
