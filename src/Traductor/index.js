import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import bloqueo from "./simbolos/Candado.png";

import "font-awesome/css/font-awesome.css";
import "./Traductor.css";


function Traductor(props) {
  const [cambiar, setCambiar] = React.useState(true);
  const [turner, setTurner] = React.useState(false);
  const valid = props.valid;
  const image = props.img;
  const anagrama = props.anagrama;
  const [symbols, setSymbols] = useState([]);
  const [roomCode, setRoomCode] = useState(""); // State to store the room code

  useEffect(() => {
    const sendSymbols = async () => {
      try {
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
        "https://testdeploy-production-9d97.up.railway.app/roomCode"
      );
      console.log("Code: ", response.data[0].code); // Log entire response
      if (response.data.length > 0 && response.data[0].code) {
        setRoomCode(response.data[0].code); // Set the room code state
      }
    } catch (error) {
      console.error("Error fetching room code:", error);
    }
  };

  const fetchSymbols = async () => {
    try {
      const response = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/roomCode"
      );
      setSymbols(response.data[0].huaqueroSymbols); // Assuming the symbols are stored in an array inside the response
    } catch (error) {
      console.error("Error fetching symbols:", error);
    }
  };

  const updateSymbol = async (symbolName) => {
    try {
      const response = await axios.patch(
        "https://testdeploy-production-9d97.up.railway.app/roomCode",
        {
          symbolName,
          found: true,
        }
      );
      console.log(`Symbol ${symbolName} updated successfully`);
    } catch (error) {
      console.error(`Error updating symbol ${symbolName}:`, error);
    }
  };

  const imageToSymbolMap = {
    "simbolo1": "simbolo1",
    "simbolo2": "simbolo2",
    "simbolo3": "simbolo3",
    "QzmByuQAAAABJRU5ErkJggg==": "simbolo4",
    "simbolo5": "simbolo1",
    "simbolo6": "simbolo2",
    "simbolo7": "simbolo3",
    "simbolo8": "simbolo4",
    "simbolo9": "simbolo1",
    "simbolo10": "simbolo2",
    "simbolo11": "simbolo3",
    "simbolo12": "simbolo4",
    "simbolo13": "simbolo1",
    "simbolo14": "simbolo2",
    "simbolo15": "simbolo3",
    "simbolo16": "simbolo4",
    "simbolo17": "simbolo1",
    "simbolo18": "simbolo2",
    "simbolo19": "simbolo3",
    "simbolo20": "simbolo4"
  };

  const onSwitch = (event) => {
    setCambiar(!cambiar);
    const imageName = props.imgSimbolo
      .split("/") // Split the URL by slashes
      .pop() // Get the last part of the URL (the file name)
      .split(".")[0]; // Remove the file extension (e.g., '.png')
    // Now symbolName contains the extracted symbol name

    console.log("Nombre de la imagen extraída:", imageName);

    const symbolName = imageToSymbolMap[imageName];
    if (symbolName) {
      console.log(symbolName);
      updateSymbol(symbolName);
    } else {
      console.error(
        `El nombre de la imagen '${imageName}' no tiene un símbolo asociado en el mapeo.`
      );
    }
  };

  const onLock = (event) => {
    setCambiar(!cambiar);
  };

  const onTurn = (event) => {
    setTurner(!turner);
  };
  return (
    <div>
      {!valid ? (
        <img
          className="imgAnagramaBlock"
          onClick={onLock}
          src={bloqueo}
          alt="Logo alusivo de las culturas"
        />
      ) : (
        <img
          className="imgAnagramaBlock"
          onClick={onSwitch}
          src={cambiar ? props.imgSimbolo : props.imgAnagrama}
          alt="Logo alusivo de las culturas"
        />
      )}
    </div>
  );
}

export { Traductor };
