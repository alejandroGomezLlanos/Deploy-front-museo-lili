import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function TimeTest() {
  const [time, setTime] = useState(10);
  const intervalRef = useRef(null);

  const fetchTime = async () => {
    try {
      // Obtener el código de la sala
      const response = await axios.get(
        "https://172.16.20.198:80/time"
      );
      setTime(response.data[0].time);
      

      if (time === -1) {
        clearInterval(intervalRef.current);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    // Obtener datos de la sala inmediatamente cuando el componente se monta
    fetchTime();

    // Establecer un intervalo para obtener datos
    intervalRef.current = setInterval(fetchTime, 10 * 50);
    console.log(time)

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time]);

  const updateTime = async (time) => {
    try {
      const response = await axios.patch(
        "https://172.16.20.198:80/time",
        { time: 5 }
      );
      console.log(`Time updated successfully to ${time}`);
    } catch (error) {
      console.error(`Error updating time ${time}:`, error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Tiempo restante: {time}</h1>

      <button
        onClick={updateTime}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Actualizar Tiempo
      </button>
    </div>
  );
}

export { TimeTest };
