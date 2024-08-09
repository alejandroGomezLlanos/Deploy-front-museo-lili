import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter, Router, Routes, Route } from "react-router-dom";

import { MyContextProvider } from "./SeleccionCargando/MyContext";
import { InputCodigo } from "./InputCodigo";
import { PantallaMuseo } from "./PantallaMuseo";
import { AnimacionMuseo } from "./AnimacionMuseo";
import { QrMuseo } from "./QrMuseo";
import { RolesMuseo } from "./RolesMuseo";
import { EstadoMuseo } from "./EstadoMuseo";
import { PruebaPrueba } from "./PruebaPrueba/PruebaPrueba";
import { Header } from "./Header";
import { Contexto } from "./Contexto";
import { Mapa } from "./Mapa";
import { Minijuego } from "./Traductor/Minijuego.js";
import { Introduccion } from "./Introduccion";
import { SeleccionCargando } from "./SeleccionCargando";
import { Picker } from "./Picker";
import { Bloqueo } from "./Bloqueo";
import { JuegoHuaquero } from "./JuegoHuaquero";
import { SymbolsPage } from "./huaquero2AntroTest";
import { FeedbackPositivo } from "./Ganan";
import { FeedbackNegativo } from "./Pierden";
import { AntroTest } from "./antrotest";
import { MuseoInduccion } from "./MuseoInduccion";
import { FraseMuseo } from "./FraseMuseo";
import { RevisarCelular } from "./RevisarCelular";
import { IntentaloDenuevo } from "./IntentaloDenuevo";
import { GananMuseo } from "./GananMuseo";
import { TestTimeOut } from "./testTimeOut";
import { TestFinalizada } from "./TestFinalizada/index.js";
import { MuseoTabla } from "./MuseoTabla";
import { TablaMuseoMejorT } from "./TabaMuseoMejorT";
import { Huaquero } from "./Huaquero";
import { TematicaMuseo } from "./TematicaMuseo";
import { TematicaMuseo2 } from "./TematicaMuseo2";
import { HuaqSymbol1 } from "./HuaqSymbol1";
import { HuaqSymbol2 } from "./HuaqSymbol2";
import { HuaqSymbol3 } from "./HuaqSymbol3";
import { HuaqSymbol4 } from "./HuaqSymbol4";
import { HuaqSymbol5 } from "./HuaqSymbol5";
import { HuaqSymbol6 } from "./HuaqSymbol6";
import { HuaqSymbol7 } from "./HuaqSymbol7";
import { HuaqSymbol8 } from "./HuaqSymbol8";
import { HuaqSymbol9 } from "./HuaqSymbol9";
import { HuaqSymbol10 } from "./HuaqSymbol10";
import { HuaqSymbol11 } from "./HuaqSymbol11";
import { HuaqSymbol12 } from "./HuaqSymbol12";
import { HuaqSymbol13 } from "./HuaqSymbol13";
import { HuaqSymbol14 } from "./HuaqSymbol14";
import { HuaqSymbol15 } from "./HuaqSymbol15";
import { HuaqSymbol16 } from "./HuaqSymbol16";
import { HuaqSymbol17 } from "./HuaqSymbol17";
import { HuaqSymbol18 } from "./HuaqSymbol18";
import { HuaqSymbol19 } from "./HuaqSymbol19";
import { HuaqSymbol20 } from "./HuaqSymbol20";
import { HuaqQR } from "./HuaqQR/index.js";
import { HuaqCamera } from "./HuaqCamera/index.js";
import { TimeTest } from "./TimeTest/index.js";
import { EsperarCelular } from "./EsperarCelular/index.js";
import { TablaPuntuacion } from "./TablaPuntuacion/index.js";
import { HuaqConf } from "./HuaqConf/index.js";

function App() {
  const [historia, setHistoria] = useState(1);


  return (
    <div className="App">
      <HashRouter>
        {/* Envuelve toda la aplicación con MyContextProvider */}
        <MyContextProvider>
          {/* <Header rol={"Antropólogo"} /> */}
          {/* <Contexto titulo={"Descifra las palabras"} parrafo={"Solicita al intérprete las palabras claves"}></Contexto> */}
          {/* Tu contenido de la aplicación */}
          <Routes>
            <Route path="/*" element={<p>no encontrado</p>} />
            <Route path="/" element={<InputCodigo />} />

            <Route path="/museo" element={<PantallaMuseo />} />

            <Route path="/MuseoInduccion" element={<MuseoInduccion />} />
            <Route path="/animacionMuseo" element={<AnimacionMuseo />} />
            <Route path="/qrMuseo" element={<QrMuseo />} />
            <Route path="/tematicaMuseo" element={<TematicaMuseo />} />
            <Route path="/rolesMuseo" element={<RolesMuseo />} />
            <Route path="/estadoMuseo" element={<EstadoMuseo />} />
            <Route path="/revisarCelular" element={<RevisarCelular />} />
            <Route path="/fraseMuseo" element={<FraseMuseo historia={historia} />} />

            <Route path="/tematicaMuseo2" element={<TematicaMuseo2 />} />

            <Route path="/introduccion" element={<Picker />} />
            <Route path="/introduccion/:slug" element={<Introduccion />} />

            <Route path="/TestFinalizada" element={<TestFinalizada />} />
            <Route path="/seleccionCargando" element={<SeleccionCargando />} />

            <Route path="/TablaPuntuacion" element={<TablaPuntuacion />} />

            <Route path="/juego/guia" element={<Mapa historia={historia} />} />
            <Route path="/juego/huaquero" element={<HuaqCamera />} />
            <Route
              path="/juego/interprete"
              element={<Minijuego historia={historia}></Minijuego>}
            />
            <Route
              path="/juego/antropologo"
              element={<Bloqueo historia={historia}></Bloqueo>}
            />

            <Route path="/pierden" element={<FeedbackNegativo />} />
            <Route path="/ganan" element={<FeedbackPositivo />} />

            <Route path="/intentaloDenuevo" element={<IntentaloDenuevo/>} />
            <Route path="/gananMuseo" element={<GananMuseo historia={historia} />} />
            <Route path="/museoTabla" element={<MuseoTabla/>} />

            <Route path="/HuaqSymbol1" element={<HuaqSymbol1 historia={historia} />} />
            <Route path="/HuaqSymbol2" element={<HuaqSymbol2 historia={historia} />} />
            <Route path="/HuaqSymbol3" element={<HuaqSymbol3 historia={historia} />} />
            <Route path="/HuaqSymbol4" element={<HuaqSymbol4 historia={historia} />} />
            <Route path="/HuaqSymbol5" element={<HuaqSymbol5 historia={historia} />} />
            <Route path="/HuaqSymbol6" element={<HuaqSymbol6 historia={historia} />} />
            <Route path="/HuaqSymbol7" element={<HuaqSymbol7 historia={historia} />} />
            <Route path="/HuaqSymbol8" element={<HuaqSymbol8 historia={historia} />} />
            <Route path="/HuaqSymbol9" element={<HuaqSymbol9 historia={historia} />} />
            <Route
              path="/HuaqSymbol10"
              element={<HuaqSymbol10 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol11"
              element={<HuaqSymbol11 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol12"
              element={<HuaqSymbol12 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol13"
              element={<HuaqSymbol13 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol14"
              element={<HuaqSymbol14 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol15"
              element={<HuaqSymbol15 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol16"
              element={<HuaqSymbol16 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol17"
              element={<HuaqSymbol17 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol18"
              element={<HuaqSymbol18 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol19"
              element={<HuaqSymbol19 historia={historia} />}
            />
            <Route
              path="/HuaqSymbol20"
              element={<HuaqSymbol20 historia={historia} />}
            />

            <Route path="/HuaqQR" element={<HuaqQR />} />

            <Route path="/HuaqConf" element={<HuaqConf />} />

            <Route
              path="/EsperarCelular"
              element={<EsperarCelular historia={historia} />}
            />
          </Routes>
        </MyContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;
