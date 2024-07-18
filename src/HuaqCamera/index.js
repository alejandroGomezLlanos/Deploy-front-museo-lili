import React, { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import "./HuaqCamera.css";
import { Header } from "../Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HuaqCamera() {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState(""); // State to store the room code
  const [activeRoomCode, setActiveRoomCode] = useState("");
  const [symbols, setSymbols] = useState([]);

  const [userDataG, setUserDataG] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

  const [userDataH, setUserDataH] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

  const [userDataI, setUserDataI] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });
  const [userDataA, setUserDataA] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const data = await getCurrentRoom();
        if (data) {
          setActiveRoomCode(data);
          console.log("Room data set:", data);

          // Start the interval only after the activeRoomCode has been set.
          intervalId = setInterval(async () => {
            const numOfUsers = await findNFilterUsers(data); // pass the fetched room code directly

            // Clear the interval if 4 users are found
            if (numOfUsers >= 5) clearInterval(intervalId);
          }, 3000);
        } else {
          console.error("No room data received");
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();

    // Clear the interval when the component is unmounted.
    return () => clearInterval(intervalId);
  }, []);

  const getCurrentRoom = async () => {
    try {
      const response = await axios.get(
        "http://172.16.20.198:3500/roomCode"
      );
      const currentRoomArray = response.data;

      if (currentRoomArray && currentRoomArray.length > 0) {
        const currentRoomCode = currentRoomArray[0].code;
        return currentRoomCode; // returns only the room code string
      } else {
        console.error("Room not found");
      }
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };

  useEffect(() => {
    if (
      userDataG.finalizadaTarea == true &&
      userDataH.finalizadaTarea == true &&
      userDataI.finalizadaTarea == true &&
      userDataA.finalizadaTarea == true
    ) {
      setTimeout(() => {
        navigate("/ganan");
      }, 3000); // Espera 5 segundos (5000 ms) antes de redirigir
    }
  }, [userDataG, userDataG, userDataG, userDataG]);

  const findNFilterUsers = async (roomCode) => {
    try {
      const response = await axios.get(
        "http://172.16.20.198:3500/users"
      );
      const users = response.data;
      const matchedUsers = users.filter((u) => u.codigoSala === roomCode);

      if (matchedUsers && matchedUsers.length > 0) {
        console.log("Found users: ");
        matchedUsers.forEach((user) => {
          console.log(
            "Name:",
            user.name,
            "Room Code:",
            user.codigoSala,
            "User Role: ",
            user.rol
          );

          // Check user's role, update state, and set name accordingly
          switch (user.rol) {
            case "Guía":
              setUserDataG(user);
              break;
            case "Huaquero":
              setUserDataH(user);
              break;
            case "Intérprete":
              setUserDataI(user);
              break;
            case "Antropólogo":
              setUserDataA(user);
              break;
            default:
              console.error("Unknown user role:", user.rol);
          }
        });
      } else {
        console.log("No users found with room code", roomCode);
      }

      return matchedUsers.length;
    } catch (error) {
      console.error("Error fetching and filtering users:", error);
    }
  };

  useEffect(() => {
    const sendSymbols = async () => {
      try {
        await addSymbol("Symbol1");
        await addSymbol("Symbol2");
        await addSymbol("Symbol3");
        await addSymbol("Symbol4");
        await addSymbol("simbolo1");
        await addSymbol("simbolo2");
        await addSymbol("simbolo3");
        await addSymbol("simbolo4");

        // After sending all symbols, fetch the room code and symbols
        fetchRoomCode();
        fetchSymbols();
      } catch (error) {
        console.error("Error sending symbols:", error);
      }
    };

    // Call the function to send symbols
    sendSymbols();
  }, []);

  const fetchRoomCode = async () => {
    try {
      const response = await axios.get(
        "http://172.16.20.198:3500/roomCode"
      );
      console.log("Code: ", response.data[0].code); // Log entire response
      if (response.data.length > 0 && response.data[0].code) {
        setRoomCode(response.data[0].code); // Set the room code state
      }
    } catch (error) {
      console.error("Error fetching room code:", error);
    }
  };

  const addSymbol = async (symbolName) => {
    try {
      const response = await axios.post(
        "http://172.16.20.198:3500/roomCode",
        {
          huaqueroSymbols: {
            name: symbolName,
            found: false,
          },
        }
      );
      console.log(`${symbolName} posted successfully`);
      setSymbols([...symbols, response.data]); // Update the symbols array with the newly added symbol
    } catch (error) {
      console.error(`Error posting ${symbolName}:`, error);
    }
  };

  const fetchSymbols = async () => {
    try {
      const response = await axios.get(
        "http://172.16.20.198:3500/roomCode"
      );
      setSymbols(response.data[0].huaqueroSymbols); // Assuming the symbols are stored in an array inside the response
    } catch (error) {
      console.error("Error fetching symbols:", error);
    }
  };

  // SCANNER //
  const [scanResult, setScanResult] = useState("");

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
    height: "40%",
    maxwidth: "40%",
    width: "auto",
    borderRadius: "30px", // Añade bordes redondeados
    overflow: "hidden", // Oculta cualquier contenido que se desborde del contenedor
  };

  const videoConstraints = {
    facingMode: "environment", // Especifica que se use la cámara trasera
  };

  return (
    <div>
      <Header></Header>
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
          constrains={videoConstraints}
        />
        <p className="parrafoInferior margen">
          Resultado del escaneo: {scanResult}
        </p>
      </div>
    </div>
  );
}

export { HuaqCamera };
