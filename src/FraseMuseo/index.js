import React, { useState, useEffect, useRef } from "react";
import "./fraseMuseo.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import fondo from "./resource/fondo1.png";
import cronometro from "../Header/Reloj/Reloj15.png";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import sonidoIncorrecto from "./resource/sonidoincorrecto.mp3";
import sonidoCorrecto from "./audio/sonidoCorrecto.mp3";

import useSound from "use-sound";

import videoSemana1 from "./videosSemanas/Cuencos_1.mp4";
import videoSemana2 from "./videosSemanas/Alcarrazas_1.mp4";
import videoSemana3 from "./videosSemanas/Volantes_1.mp4";
import videoSemana4 from "./videosSemanas/Urnas_1.mp4";
import videoSemana5 from "./videosSemanas/Silbatos_1.mp4";

const ItemTypes = {
  WORD: "word",
};

function DraggableWord({
  word,
  onDrop,
  isDraggable,
  sentence,
  isDraggedToDropSpace,
}) {
  const isWordInSentence = sentence.includes(word);

  const [{ isDragging }, ref] = useDrag({
    type: ItemTypes.WORD,
    item: { word, isDraggable },
    canDrag: isDraggable || !isWordInSentence, // Allow drag if not in sentence
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={ref}
      className={`draggable-word ${isDraggable || !isWordInSentence || isDraggedToDropSpace
        ? ""
        : "dragged"
        }`}
      style={{ opacity }}
    >
      {word}
    </div>
  );
}

function DropSpace({ onDrop, index, completed }) {
  const [{ canDrop, isOver }, ref] = useDrop({
    accept: ItemTypes.WORD,
    drop: (item) => onDrop(item.word, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={ref}
      className={`drop-space ${isActive ? "active" : completed ? "completed" : ""
        }`}
    ></div>
  );
}

function FraseMuseo({ historia }) {
  const [sentence, setSentence] = useState([null, null, null, null]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [SonidoIncorrecto] = useSound(sonidoIncorrecto);
  const [SonidoCorrecto] = useSound(sonidoCorrecto);
  const [completed, setCompleted] = useState(false);

  const [guia, setGuia] = useState(false);
  const [huaquero, setHuaquero] = useState(false);
  const [interprete, setInterprete] = useState(false);
  const [antropologo, setAntropologo] = useState(false); // modificar este estado cuando el antropologo le unda continuar en su pantalla // SIEMPRE DEBE INICIAR EN FALSO  

  const [availableWords, setAvailableWords] = useState([]);
  const [pair1Matched, setPair1Matched] = useState(false);
  const [pair2Matched, setPair2Matched] = useState(false);
  const [pair3Matched, setPair3Matched] = useState(false);
  const [pair4Matched, setPair4Matched] = useState(false);
  const [allWordsInDropSpaces, setAllWordsInDropSpaces] = useState(false);
  const [atLeastOnePairFalse, setAtLeastOnePairFalse] = useState(false);
  const [showPerdieron, setShowPerdieron] = useState(false);

  const [draggedWordsInDropSpace, setDraggedWordsInDropSpace] = useState(0);

  const [activeRoomCode, setActiveRoomCode] = useState("");

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

  const obtenerUrlVideo = (historia) => {
    switch (historia) {
      case 1:
        return videoSemana1; // Cambiar a la URL correspondiente
      case 2:
        return videoSemana2; // Cambiar a la URL correspondiente
      case 3:
        return videoSemana3; // Cambiar a la URL correspondiente
      case 4:
        return videoSemana4; // Cambiar a la URL correspondiente
      case 5:
        return videoSemana5; // Cambiar a la URL correspondiente
      default:
        // Manejar el caso por defecto o asignar una URL por defecto si es necesario
        return "URL_POR_DEFECTO";
    }
  };
  const videoUrl = obtenerUrlVideo(historia);

  useEffect(() => {
    // Establece availableWords según el valor de historia
    if (historia === 2) {
      setAvailableWords(["rituales", "arte", "alfareros", "tiempo"]);
    } else if (historia === 1) {
      setAvailableWords(["culturas", "formas", "pueblos", "legado"]);
    } else if (historia === 3) {
      setAvailableWords(["obras", "hilos", "historias", "fuente"]);
    } else if (historia === 4) {
      setAvailableWords(["rituales", "urna", "infancia", "cruza"]);
    } else if (historia === 5) {
      setAvailableWords(["sonidos", "piezas", "historias", "silbato"]);
    }
  }, [historia]);

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
      const response = await axios.get("https://testdeploy-production-9d97.up.railway.app/roomCode");
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

  const findNFilterUsers = async (roomCode) => {
    try {
      const response = await axios.get("https://testdeploy-production-9d97.up.railway.app/users");
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
              setGuia(true);
              setUserDataG(user);
              break;
            case "Huaquero":
              setHuaquero(true);
              setUserDataH(user);
              break;
            case "Intérprete":
              setInterprete(true);
              setUserDataI(user);
              break;
            case "Antropólogo":
              setUserDataA(user);
              console.log("El usuario antropologo existe.");
              if (user.finalizadaTarea === true) {
                console.log(`El usuario Antropologo ha terminado su tarea.`);
                setAntropologo(true);
              }
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

  const updateState = async () => {
    if (antropologo) {
      try {
        if (guia) {
          console.log(userDataG)
          const response = await axios.patch(
            "https://testdeploy-production-9d97.up.railway.app/users",
            {
              _id: userDataG._id,
              name: userDataG.name,
              identification: userDataG.identification,
              email: userDataG.email,
              rol: userDataG.rol,
              finalizadaTarea: "true",
              tipoUsuario: userDataG.tipoUsuario,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("User Guía updated:", response.data);
        }

        if (huaquero) {
          const response = await axios.patch(
            "https://testdeploy-production-9d97.up.railway.app/users",
            {
              _id: userDataH._id,
              name: userDataH.name,
              identification: userDataH.identification,
              email: userDataH.email,
              rol: userDataH.rol,
              finalizadaTarea: "true",
              tipoUsuario: userDataH.tipoUsuario,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("User Huaquero updated:", response.data);
        }

        if (interprete) {
          const response = await axios.patch(
            "https://testdeploy-production-9d97.up.railway.app/users",
            {
              _id: userDataI._id,
              name: userDataI.name,
              identification: userDataI.identification,
              email: userDataI.email,
              rol: userDataI.rol,
              finalizadaTarea: "true",
              tipoUsuario: userDataH.tipoUsuario,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("User Interprete updated:", response.data);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const [wordDraggedToDropSpace, setWordDraggedToDropSpace] = useState([
    false,
    false,
    false,
    false,
  ]);

  const handleDropWord = (word, index) => {
    const newSentence = [...sentence];
    newSentence[index] = word;
    setSentence(newSentence);
    handleWordDrop(word, index, historia);
    setDraggedWordsInDropSpace(draggedWordsInDropSpace + 1);
    const updatedWordDraggedToDropSpace = [...wordDraggedToDropSpace];
    updatedWordDraggedToDropSpace[index] = true;
    setWordDraggedToDropSpace(updatedWordDraggedToDropSpace);

    // Eliminar la palabra del arreglo de palabras disponibles
    const updatedAvailableWords = availableWords.filter((w) => w !== word);
    setAvailableWords(updatedAvailableWords);
  };

  useEffect(() => {
    if (
      draggedWordsInDropSpace === sentence.length &&
      matchedPairs < sentence.length
    ) {
      console.log("Perdieron");
    }
  }, [draggedWordsInDropSpace, sentence, matchedPairs]);

  useEffect(() => {
    // Verifica si todas las palabras están en los dropspaces
    if (sentence.every((word) => word !== null)) {
      setAllWordsInDropSpaces(true);

      // Verifica si al menos un par es falso
      if (!pair1Matched || !pair2Matched || !pair3Matched || !pair4Matched) {
        setAtLeastOnePairFalse(true);
        SonidoIncorrecto();
        setShowPerdieron(true); // Muestra "Perdieron" si al menos un par es falso
      }
    } else {
      setAllWordsInDropSpaces(false);
    }
  }, [sentence, pair1Matched, pair2Matched, pair3Matched, pair4Matched]);

  useEffect(() => {
    const expectedSentence = ["Volantes", "Huso", "Forma", "Volcán"];
    if (JSON.stringify(sentence) === JSON.stringify(expectedSentence)) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [sentence]);


  // Function to format the time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  const handleWordDrop = (word, index, historia) => {
    let pair1, pair2, pair3, pair4;

    if (historia === 2) {
      pair1 = ["rituales", 0];
      pair2 = ["arte", 1];
      pair3 = ["alfareros", 2];
      pair4 = ["tiempo", 3];
    } else if (historia === 1) {
      pair1 = ["culturas", 0];
      pair2 = ["formas", 1];
      pair3 = ["pueblos", 2];
      pair4 = ["legado", 3];
    } else if (historia === 3) {
      pair1 = ["obras", 0];
      pair2 = ["hilos", 1];
      pair3 = ["historias", 2];
      pair4 = ["fuente", 3];
    } else if (historia === 4) {
      pair1 = ["rituales", 0];
      pair2 = ["urna", 1];
      pair3 = ["infancia", 2];
      pair4 = ["cruza", 3];
    }
    if (historia === 5) {
      pair1 = ["sonidos", 0];
      pair2 = ["piezas", 1];
      pair3 = ["historias", 2];
      pair4 = ["silbato", 3];
    }

    if (
      (word === pair1[0] && index === pair1[1]) ||
      (word === pair2[0] && index === pair2[1]) ||
      (word === pair3[0] && index === pair3[1]) ||
      (word === pair4[0] && index === pair4[1])
    ) {
      // Las parejas coinciden
      if (word === pair1[0]) {
        console.log(
          `La DraggableWord '${word}' ha sido colocada en el DropSpace con key=${index}.`
        );
        setPair1Matched(true);
      } else if (word === pair2[0]) {
        console.log(
          `La DraggableWord '${word}' ha sido colocada en el DropSpace con key=${index}.`
        );
        setPair2Matched(true);
      } else if (word === pair3[0]) {
        console.log(
          `La DraggableWord '${word}' ha sido colocada en el DropSpace con key=${index}.`
        );
        setPair3Matched(true);
      } else if (word === pair4[0]) {
        console.log(
          `La DraggableWord '${word}' ha sido colocada en el DropSpace con key=${index}.`
        );
        setPair4Matched(true);
      }

      // Incrementa el contador de parejas coincidentes
      setMatchedPairs(matchedPairs + 1);
    } else {
      // Las parejas no coinciden
      console.error(
        "Error: La pareja de DraggableWord y DropSpace no coincide."
      );
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (pair1Matched && pair2Matched && pair3Matched && pair4Matched) {
      setTimeout(() => {
        SonidoCorrecto();
        console.log("¡Ganaron!");
        updateState();
        navigate("/gananMuseo");
      }, 5000); // Espera 5 segundos (5000 ms) antes de redirigir
    }
  }, [pair1Matched, pair2Matched, pair3Matched, pair4Matched]);

  // Esto es para manejar el estilo condicional de .txtPalabra
  const txtPalabraStyle = {
    backgroundColor:
      (!pair1Matched || !pair2Matched || !pair3Matched || !pair4Matched) &&
        allWordsInDropSpaces &&
        atLeastOnePairFalse
        ? "rgb(216, 59, 48)"
        : pair1Matched && pair2Matched && pair3Matched && pair4Matched
          ? "#4CAF50"
          : "",
  };

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      (!pair1Matched || !pair2Matched || !pair3Matched || !pair4Matched) &&
      allWordsInDropSpaces &&
      atLeastOnePairFalse
    ) {
      setSentence([null, null, null, null]); // Reset the sentence state
      if (historia === 2) {
        setAvailableWords(["rituales", "arte", "alfareros", "tiempo"]);
      } else if (historia === 1) {
        setAvailableWords(["culturas", "formas", "pueblos", "legado"]);
      } else if (historia === 3) {
        setAvailableWords(["obras", "hilos", "historias", "fuente"]);
      } else if (historia === 4) {
        setAvailableWords(["rituales", "urna", "infancia", "cruza"]);
      } else if (historia === 5) {
        setAvailableWords(["sonidos", "piezas", "historias", "silbato"]);
      }
      setShowModal(true); // Set showModal to true to display the modal

      // Automatically close the modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        console.log("Perdieron");
        // navigate("/intentaloDenuevo");
      }, 3000);
    }
  }, [
    allWordsInDropSpaces,
    pair1Matched,
    pair2Matched,
    pair3Matched,
    pair4Matched,
  ]);

  useEffect(() => {
    if (
      (!pair1Matched || !pair2Matched || !pair3Matched || !pair4Matched) &&
      allWordsInDropSpaces &&
      atLeastOnePairFalse
    ) {
      setSentence([null, null, null, null]); // Reset the sentence state
      if (historia === 2) {
        setAvailableWords(["rituales", "arte", "alfareros", "tiempo"]);
      } else if (historia === 1) {
        setAvailableWords(["culturas", "formas", "pueblos", "legado"]);
      } else if (historia === 3) {
        setAvailableWords(["obras", "hilos", "historias", "fuente"]);
      } else if (historia === 4) {
        setAvailableWords(["rituales", "urna", "infancia", "cruza"]);
      } else if (historia === 5) {
        setAvailableWords(["sonidos", "piezas", "historias", "silbato"]);
      }
      setShowModal(true); // Set showModal to true to display the modal

      // Automatically close the modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        console.log("Perdieron");
        // navigate("/intentaloDenuevo");
      }, 3000);
    }
  }, [
    allWordsInDropSpaces,
    pair1Matched,
    pair2Matched,
    pair3Matched,
    pair4Matched,
  ]);

  const [time, setTime] = useState(10);
  const intervalRef = useRef(null);

  const fetchTime = async () => {
    try {
      // Obtener el tiempo desde el backend
      const response = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/time"
      );
      const fetchedTime = response.data[0].time;
      setTime(fetchedTime);
      localStorage.setItem("compTime", fetchedTime); // Guardar el tiempo en localStorage
  
      if (fetchedTime === 900) {
        clearInterval(intervalRef.current);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    // Obtener datos de la sala inmediatamente cuando el componente se monta
    fetchTime();
    handleSubmit();

    // Establecer un intervalo para obtener datos
    intervalRef.current = setInterval(fetchTime, 10 * 50);
    console.log(time)

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [time]);

  const handleSubmit = () => {
    if (time === 0) {
      navigate("/intentaloDenuevo");
    } 
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {showModal && (
        <div className="modalfrasemuseo">
          <p>La frase es incorrecta, inténtalo nuevamente.</p>
        </div>
      )}
      {antropologo ? (
        <div className="complete-the-sentence" style={{ backgroundImage: `url(${fondo})` }}>

          <h1 className={`tituloFraseMuseo ${completed ? "green-title" : ""}`}>
            Mueve las palabras
          </h1>
          {historia === 2 && (
            <div className="sentence frase1">
              <p className="txtFrase">Los cuencos se usan en</p>

              {sentence[0] ? (
                <span className="txtPalabra" key={0} style={txtPalabraStyle}>
                  {sentence[0]}
                </span>
              ) : (
                <DropSpace
                  key={0}
                  onDrop={handleDropWord}
                  index={0}
                  completed={completed}
                />
              )}
              <p className="txtFrase">que nos revelan </p>
              <p className="txtFrase">la profunda conexión entre el </p>
              {sentence[1] ? (
                <span className="txtPalabra" key={1} style={txtPalabraStyle}>
                  {sentence[1]}
                </span>
              ) : (
                <DropSpace
                  key={1}
                  onDrop={handleDropWord}
                  index={1}
                  completed={completed}
                />
              )}
              <p className="txtFrase">
                la cultura y la preservación del legado ancestral{" "}
              </p>
              <p className="txtFrase"> de los</p>
              {sentence[2] ? (
                <span className="txtPalabra" key={2} style={txtPalabraStyle}>
                  {sentence[2]}
                </span>
              ) : (
                <DropSpace
                  key={2}
                  onDrop={handleDropWord}
                  index={2}
                  completed={completed}
                />
              )}
              <p className="txtFrase">nariñenses a través del </p>
              {sentence[3] ? (
                <span className="txtPalabra" key={3} style={txtPalabraStyle}>
                  {sentence[3]}
                </span>
              ) : (
                <DropSpace
                  key={3}
                  onDrop={handleDropWord}
                  index={3}
                  completed={completed}
                />
              )}
              <p className="txtFrase">.</p>
            </div>
          )}
          {historia === 1 && (
            <div className="sentence frase2">
              <p className="txtFrase">Las alcarrazas, testigos de antiguas </p>

              {sentence[0] ? (
                <span className="txtPalabra" key={0} style={txtPalabraStyle}>
                  {sentence[0]}
                </span>
              ) : (
                <DropSpace
                  key={0}
                  onDrop={handleDropWord}
                  index={0}
                  completed={completed}
                />
              )}
              <p className="txtFrase">
                {" "}
                malagana y yotoco, nos revelan en sus{" "}
              </p>
              {sentence[1] ? (
                <span className="txtPalabra" key={1} style={txtPalabraStyle}>
                  {sentence[1]}
                </span>
              ) : (
                <DropSpace
                  key={1}
                  onDrop={handleDropWord}
                  index={1}
                  completed={completed}
                />
              )}
              <p className="txtFrase">
                antropomorfas, zoomorfas y fitomorfas, la{" "}
              </p>
              <p className="txtFrase">
                asombrosa creatividad y conexión con la naturaleza{" "}
              </p>
              <p className="txtFrase"> de estos</p>
              {sentence[2] ? (
                <span className="txtPalabra" key={2} style={txtPalabraStyle}>
                  {sentence[2]}
                </span>
              ) : (
                <DropSpace
                  key={2}
                  onDrop={handleDropWord}
                  index={2}
                  completed={completed}
                />
              )}
              <p className="txtFrase">ancestrales, un </p>
              {sentence[3] ? (
                <span className="txtPalabra" key={3} style={txtPalabraStyle}>
                  {sentence[3]}
                </span>
              ) : (
                <DropSpace
                  key={3}
                  onDrop={handleDropWord}
                  index={3}
                  completed={completed}
                />
              )}
              <p className="txtFrase">que apreciamos y preservamos para </p>
              <p className="txtFrase">las generaciones venideras. </p>
            </div>
          )}
          {historia === 3 && (
            <div className="sentence frase3">
              <p className="txtFrase">
                Los volantes de huso, más que simples herramientas,{" "}
              </p>
              <p className="txtFrase"> son auténticas </p>

              {sentence[0] ? (
                <span className="txtPalabra" key={0} style={txtPalabraStyle}>
                  {sentence[0]}
                </span>
              ) : (
                <DropSpace
                  key={0}
                  onDrop={handleDropWord}
                  index={0}
                  completed={completed}
                />
              )}
              <p className="txtFrase"> de arte que tejían no solo </p>
              {sentence[1] ? (
                <span className="txtPalabra" key={1} style={txtPalabraStyle}>
                  {sentence[1]}
                </span>
              ) : (
                <DropSpace
                  key={1}
                  onDrop={handleDropWord}
                  index={1}
                  completed={completed}
                />
              )}
              <p className="txtFrase">sino también </p>
              {sentence[2] ? (
                <span className="txtPalabra" key={2} style={txtPalabraStyle}>
                  {sentence[2]}
                </span>
              ) : (
                <DropSpace
                  key={2}
                  onDrop={handleDropWord}
                  index={2}
                  completed={completed}
                />
              )}
              <p className="txtFrase">de la cultura </p>
              <p className="txtFrase">
                {" "}
                quimbaya y yotoco. Sus diseños celestiales y{" "}
              </p>
              <p className="txtFrase">
                {" "}
                naturales inspiraron incluso al reconocido artista{" "}
              </p>
              <p className="txtFrase">
                {" "}
                colombiano Omar Rayo, quien vio en ellos una{" "}
              </p>
              {sentence[3] ? (
                <span className="txtPalabra" key={3} style={txtPalabraStyle}>
                  {sentence[3]}
                </span>
              ) : (
                <DropSpace
                  key={3}
                  onDrop={handleDropWord}
                  index={3}
                  completed={completed}
                />
              )}
              <p className="txtFrase">inagotable de creatividad geométrica.</p>
            </div>
          )}
          {historia === 4 && (
            <div className="sentence frase4">
              <p className="txtFrase">
                Las urnas funerarias, guardianas de secretos ancestrales,
              </p>
              <p className="txtFrase"> nos sumergen en los </p>

              {sentence[0] ? (
                <span className="txtPalabra" key={0} style={txtPalabraStyle}>
                  {sentence[0]}
                </span>
              ) : (
                <DropSpace
                  key={0}
                  onDrop={handleDropWord}
                  index={0}
                  completed={completed}
                />
              )}
              <p className="txtFrase"> y creencias de </p>
              <p className="txtFrase">
                {" "}
                civilizaciones pasadas. Desde las antropomorfas Quimbayas
              </p>

              <p className="txtFrase"> hasta la conmovedora </p>
              {sentence[1] ? (
                <span className="txtPalabra" key={1} style={txtPalabraStyle}>
                  {sentence[1]}
                </span>
              ) : (
                <DropSpace
                  key={1}
                  onDrop={handleDropWord}
                  index={1}
                  completed={completed}
                />
              )}
              <p className="txtFrase">infantil, </p>
              <p className="txtFrase"> y la figura Sonso </p>
              <p className="txtFrase">que evoca la </p>
              {sentence[2] ? (
                <span className="txtPalabra" key={2} style={txtPalabraStyle}>
                  {sentence[2]}
                </span>
              ) : (
                <DropSpace
                  key={2}
                  onDrop={handleDropWord}
                  index={2}
                  completed={completed}
                />
              )}
              <p className="txtFrase">cada urna revela una historia</p>
              <p className="txtFrase"> única que </p>

              {sentence[3] ? (
                <span className="txtPalabra" key={3} style={txtPalabraStyle}>
                  {sentence[3]}
                </span>
              ) : (
                <DropSpace
                  key={3}
                  onDrop={handleDropWord}
                  index={3}
                  completed={completed}
                />
              )}
              <p className="txtFrase">los siglos y </p>
              <p className="txtFrase">nos conecta con </p>
              <p className="txtFrase">
                la diversidad cultural de épocas olvidadas.
              </p>
            </div>
          )}
          {historia === 5 && (
            <div className="sentence frase5">
              <p className="txtFrase">Los silbatos, portadores de </p>

              {sentence[0] ? (
                <span className="txtPalabra" key={0} style={txtPalabraStyle}>
                  {sentence[0]}
                </span>
              ) : (
                <DropSpace
                  key={0}
                  onDrop={handleDropWord}
                  index={0}
                  completed={completed}
                />
              )}
              <p className="txtFrase">ancestrales, nos </p>
              <p className="txtFrase">
                {" "}
                sumergen en rituales y festividades olvidadas.{" "}
              </p>
              <p className="txtFrase"> En el Museo Lili, seis de estas</p>
              {sentence[1] ? (
                <span className="txtPalabra" key={1} style={txtPalabraStyle}>
                  {sentence[1]}
                </span>
              ) : (
                <DropSpace
                  key={1}
                  onDrop={handleDropWord}
                  index={1}
                  completed={completed}
                />
              )}
              <p className="txtFrase">únicas </p>
              <p className="txtFrase"> nos revelan </p>

              {sentence[2] ? (
                <span className="txtPalabra" key={2} style={txtPalabraStyle}>
                  {sentence[2]}
                </span>
              ) : (
                <DropSpace
                  key={2}
                  onDrop={handleDropWord}
                  index={2}
                  completed={completed}
                />
              )}
              <p className="txtFrase"> intrigantes, como el</p>

              {sentence[3] ? (
                <span className="txtPalabra" key={3} style={txtPalabraStyle}>
                  {sentence[3]}
                </span>
              ) : (
                <DropSpace
                  key={3}
                  onDrop={handleDropWord}
                  index={3}
                  completed={completed}
                />
              )}
              <p className="txtFrase">
                zoomorfo del ave Tulcán, cuyo sonido estaba destinado a{" "}
              </p>
              <p className="txtFrase">
                {" "}
                los rituales espirituales de los Andes.{" "}
              </p>
            </div>
          )}
          <div className="words">
            {availableWords.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                onDrop={handleDropWord}
                isDraggable={!sentence.includes(word)} // Check if word is in the sentence
                sentence={sentence}
                isDraggedToDropSpace={wordDraggedToDropSpace.includes(true)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="tiempoGrupal" style={{ backgroundImage: `url(${fondo})` }}>

          <h1>Apresúrense, el tiempo corre...</h1>
          <img
            className="animacionCronometro tamañoGrande"
            src={cronometro}
            alt="Cronometro"
          />
          <div className="txtCronometro">Tiempo {formatTime(time)}</div>
        </div>
      )}

    </DndProvider>
  );
}

export { FraseMuseo };
