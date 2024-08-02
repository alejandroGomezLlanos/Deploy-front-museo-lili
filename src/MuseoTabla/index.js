import React, { useEffect, useState } from "react";
import "./MuseoTabla.css";
import { useNavigate } from "react-router-dom";
import logoInterprete from "./resources/logoInterprete.png";
import logoGuia from "./resources/logoGuia.png";
import logoHuaquero from "./resources/logoHuaquero.png";
import logoAntropologo from "./resources/logoAntropologo.png";

function MuseoTabla() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [time, setTime] = useState();

  useEffect(() => {
    // Recuperar la información de localStorage
    const guiaName = localStorage.getItem("guiaName");
    const huaqueroName = localStorage.getItem("huaqueroName");
    const interpreteName = localStorage.getItem("interpreteName");
    const antropologoName = localStorage.getItem("antropologoName");
    const teamTime = localStorage.getItem("compTime");
    console.log(teamTime);

    // Configurar los jugadores con sus respectivos roles
    const jugadores = [
      { role: "Guía", name: guiaName || "Nombre no disponible" },
      { role: "Huaquero", name: huaqueroName || "Nombre no disponible" },
      { role: "Intérprete", name: interpreteName || "Nombre no disponible" },
      { role: "Antropólogo", name: antropologoName || "Nombre no disponible" },
    ];

    setPlayers(jugadores);
    setTime(teamTime);
  }, []);

  const getRoleLogo = (role) => {
    switch (role) {
      case "Guía":
        return logoGuia;
      case "Huaquero":
        return logoHuaquero;
      case "Intérprete":
        return logoInterprete;
      case "Antropólogo":
        return logoAntropologo;
      default:
        return null;
    }
  };

  const handleContinuarClick = () => {
    // Redirigir a la página /museoTablaMejorT al hacer clic en el botón "Continuar"
    navigate("/museo");
  };

  return (
    <div className="container-museo-tabla">
      <h1 className="titulo-tabla">Tabla de Jugadores</h1>
      <table>
        <thead>
          <tr>
            <th className="texto-tabla">Nombre</th>
            <th className="texto-tabla">Tiempo</th>
            <th className="texto-tabla">Rol</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{time}</td>
              <td>
                <img
                  src={getRoleLogo(player.role)}
                  alt={player.role}
                  style={{ width: "60px", height: "60px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={handleContinuarClick}>
        Continuar
      </button>
    </div>
  );
}

export { MuseoTabla };
