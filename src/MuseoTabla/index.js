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

  useEffect(() => {
    // Recuperar la información de localStorage
    const guiaName = localStorage.getItem("guiaName");
    const huaqueroName = localStorage.getItem("huaqueroName");
    const interpreteName = localStorage.getItem("interpreteName");
    const antropologoName = localStorage.getItem("antropologoName");

    // Configurar los jugadores con sus respectivos roles
    const jugadores = [
      { role: "Guía", name: guiaName || "Nombre no disponible" },
      { role: "Huaquero", name: huaqueroName || "Nombre no disponible" },
      { role: "Intérprete", name: interpreteName || "Nombre no disponible" },
      { role: "Antropólogo", name: antropologoName || "Nombre no disponible" },
    ];

    setPlayers(jugadores);
  }, []);

  const handleContinuarClick = () => {
    // Redirigir a la página /museoTablaMejorT al hacer clic en el botón "Continuar"
    navigate("/museoTablaMejorT");
  };

  return (
    <div className="container-museo-tabla">
      <h1>Tabla de Jugadores</h1>
      <table>
        <thead>
          <tr>
            <th>Rol</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.role}</td>
              <td>{player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="boton-continuar" onClick={handleContinuarClick}>
        Continuar
      </button>
    </div>
  );
}

export { MuseoTabla };
