import React, { useState, useEffect } from "react";
import mapamuseolili from "./resources/mapamuseolili.png";
import pin from "./resources/pin-12.png";
import "./Mapa.css";
import axios from "axios";
import { Header } from "../Header";
import cargando from "./cargando.png";
import lupa from "./resources/lupa.png";
import lupahover from "./resources/lupahover.png";
import { Cronometro } from "../Header/Cronometro";
import TopNavegation from "./resources/TopNavigation.png";
import SonidodePuntos from "./audios/sonidopuntos.mp3";
import useSound from "use-sound";
import { update } from "lodash";
import { useNavigate } from "react-router-dom";

function Mapa(props) {
  const navigate = useNavigate();

  const [lugares, setLugares] = useState([]);
  const [ubicacion, setUbicacion] = useState(null);
  const [posicionActual, setPosicionActual] = useState(0); // Estado para rastrear la posición actual
  const [segundos, setSegundos] = useState(30); // Valor inicial del temporizador
  const [modalVisible, setModalVisible] = useState(false);
  const [esLoading, setEsLoading] = useState(false);
  const [activeRoomCode, setActiveRoomCode] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [roomCode, setRoomCode] = useState(""); // State to store the room code

  const historia = props.historia;
  const [SonidoPuntos] = useSound(SonidodePuntos);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    identification: "",
    email: "",
    rol: "",
    finalizadaTarea: "",
    tipoUsuario: "",
  });

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
        "https://testdeploy-production-9d97.up.railway.app/roomCode"
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

  const addSymbol = async (symbolName) => {
    try {
      const response = await axios.post(
        "https://testdeploy-production-9d97.up.railway.app/roomCode",
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
        "https://testdeploy-production-9d97.up.railway.app/users"
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
    buscarUbicaciones(historia);
  }, [historia]);

  useEffect(() => {
    if (lugares.length > 0) {
      setUbicacion(lugares[posicionActual]);
    }
  }, [posicionActual, lugares]);

  useEffect(() => {
    if (segundos > 0) {
      const interval = setInterval(() => {
        setSegundos((prevSegundos) => prevSegundos - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setEsLoading(true);
      setTimeout(() => {
        setEsLoading(false);

        avanzarPosicion(); // Se avanza la posición aquí cuando segundos es 0.
        setSegundos(30); // Reiniciamos el temporizador al valor inicial.
      }, 1000);
    }
  }, [segundos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(); // asssuming this function fetches user data
        if (data) {
          setUserData(data);
          console.log("User data set:", data);
        } else {
          console.error("No user data received");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData(); // invoke the function to fetch and set user data
  }, []); // empty dependency array to run only once after component mount
  const userId = localStorage.getItem("userId"); // ID from local storage

  function buscarUbicaciones(historia) {
    let lugares;

    if (historia === 1) {
      lugares = [1, 2, 3, 4];
    } else if (historia === 2) {
      lugares = [1, 4, 2, 5];
    } else if (historia === 3) {
      lugares = [3, 5, 2, 4];
    } else if (historia === 4) {
      lugares = [5, 1, 2, 3];
    } else if (historia === 5) {
      lugares = [3, 4, 1, 5];
    }

    setLugares(lugares);
  }

  function avanzarPosicion() {
    setPosicionActual((prevPosicion) =>
      prevPosicion === lugares.length - 1 ? 0 : prevPosicion + 1
    );
  }

  const closeModal = () => {
    setModalVisible(false);
    setSegundos(3); // Reiniciamos el temporizador al valor inicial
  };

  useEffect(() => {
    if (lugares.length > 0) {
      setUbicacion(lugares[posicionActual]);
    }
  }, [posicionActual, lugares]);

  const handleClick = () => {
    setSegundos(0);
    updateState();
    SonidoPuntos();
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "https://testdeploy-production-9d97.up.railway.app/users"
      ); // Adjusted the endpoint
      const users = response.data;
      const user = users.find((u) => u._id === userId); // Assuming each user object has an _id field

      if (user) {
        return user;
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateState = async () => {
    console.log(userData._id);
    console.log("UserData before axios call:", userData);

    if (userData) {
      try {
        const response = await axios.patch(
          "https://testdeploy-production-9d97.up.railway.app/users",
          {
            _id: userId,
            name: userData.name,
            identification: userData.identification,
            email: userData.email,
            rol: userData.rol,
            finalizadaTarea: "true",
            tipoUsuario: userData.tipoUsuario,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("User updated:", response.data);
        localStorage.clear();

        // localStorage.clear();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <>
      <Header></Header>
      <div className="position_map">
        <h2 className="titulosGuia">Símbolos localizados</h2>
        <div className="fondoAmarillo">
          <div className="contenedorImagen">
            {!esLoading && (
              <img src={mapamuseolili} alt="Logo del museo Lili" />
            )}
          </div>
          <div className="contenedorPunto">
            {esLoading ? (
              <div className="centrarVerticalmente">
                <img
                  className="rotating-image animacioncarga"
                  src={cargando}
                  alt="Logo de enviando"
                />
              </div>
            ) : (
              <div
                className={`web ${
                  (ubicacion === 1 && "animacionweb1") ||
                  (ubicacion === 2 && "animacionweb2") ||
                  (ubicacion === 3 && "animacionweb3") ||
                  (ubicacion === 4 && "animacionweb4") ||
                  (ubicacion === 5 && "animacionweb5")
                }`}
              >
                <img src={pin} alt="Pin" />
              </div>
            )}
          </div>
          <h1 className={segundos === 0 ? "textoRojo" : "textNormal"}>
            {segundos} Seg
          </h1>
          <button className="btn_buscar" onClick={handleClick}>
            <img src={lupa} />
          </button>
          <p className="parrafoInferior">
            Rápido, indícale al Huaquero los puntos que se marcan en el mapa.
            Toca la lupa para bucar otro símbolo.
          </p>
        </div>
      </div>
    </>
  );
}

export { Mapa };
