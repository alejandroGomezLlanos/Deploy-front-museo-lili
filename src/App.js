import "./App.css";
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
import { HashRouter, Routes, Route } from "react-router-dom";
import { Traductor } from "./Traductor";
import { Bloqueo } from "./Bloqueo";
import { JuegoHuaquero } from "./JuegoHuaquero";
import { SymbolsPage } from "./huaquero2AntroTest";
import { FeedbackPositivo } from "./Ganan";
import { FeedbackNegativo } from "./Pierden";
import { AntroTest } from "./antrotest";
import { Induccion } from "./induccion";
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

function App() {
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
            <Route path="/introduccion" element={<Picker />} />
            <Route path="/museo" element={<PantallaMuseo />} />
            <Route path="/induccion" element={<Induccion />} />
            <Route path="/animacionMuseo" element={<AnimacionMuseo />} />
            <Route path="/qrMuseo" element={<QrMuseo />} />
            <Route path="/introduccion/:slug" element={<Introduccion />} />
            <Route path="/rolesMuseo" element={<RolesMuseo />} />
            <Route path="/TestFinalizada" element={<TestFinalizada />} />
            <Route path="/seleccionCargando" element={<SeleccionCargando />} />
            <Route path="/juego/guia" element={<Mapa historia={1} />} />
            <Route
              path="/juego/interprete"
              element={<Minijuego historia={1}></Minijuego>}
            />

            <Route path="/pierden" element={<FeedbackNegativo />} />
            <Route path="/ganan" element={<FeedbackPositivo />} />

            <Route
              path="/juego/antropologo"
              element={<Bloqueo historia={1}></Bloqueo>}
            />
            <Route path="/juego/huaquero" element={<Huaquero historia={1} />} />
            <Route path="/estadoMuseo" element={<EstadoMuseo />} />

            <Route path="/revisarCelular" element={<RevisarCelular />} />

            <Route path="/fraseMuseo" element={<FraseMuseo historia={1} />} />
            <Route path="/intentaloDenuevo" element={<IntentaloDenuevo />} />
            <Route path="/gananMuseo" element={<GananMuseo historia={1} />} />
            <Route path="/museoTabla" element={<MuseoTabla />} />
            <Route path="/museoTablaMejorT" element={<TablaMuseoMejorT />} />
            <Route path="/tematicaMuseo" element={<TematicaMuseo />} /> 
            <Route path="/tematicaMuseo2" element={<TematicaMuseo2 />} />

            <Route path="/HuaqSymbol1" element={<HuaqSymbol1 />} />
            <Route path="/HuaqSymbol2" element={<HuaqSymbol2 />} />
            <Route path="/HuaqSymbol3" element={<HuaqSymbol3 />} />
            <Route path="/HuaqSymbol4" element={<HuaqSymbol4 />} />
            <Route path="/HuaqSymbol5" element={<HuaqSymbol5 />} />
            <Route path="/HuaqSymbol6" element={<HuaqSymbol6 />} />
            <Route path="/HuaqSymbol7" element={<HuaqSymbol7 />} />
            <Route path="/HuaqSymbol8" element={<HuaqSymbol8 />} />
            <Route path="/HuaqSymbol9" element={<HuaqSymbol9 />} />
            <Route path="/HuaqSymbol10" element={<HuaqSymbol10 />} />
            <Route path="/HuaqSymbol11" element={<HuaqSymbol11 />} />
            <Route path="/HuaqSymbol12" element={<HuaqSymbol12 />} />
            <Route path="/HuaqSymbol13" element={<HuaqSymbol13 />} />
            <Route path="/HuaqSymbol14" element={<HuaqSymbol14 />} />
            <Route path="/HuaqSymbol15" element={<HuaqSymbol15 />} />
            <Route path="/HuaqSymbol16" element={<HuaqSymbol16 />} />
            <Route path="/HuaqSymbol17" element={<HuaqSymbol17 />} />
            <Route path="/HuaqSymbol18" element={<HuaqSymbol18 />} />
            <Route path="/HuaqSymbol19" element={<HuaqSymbol19 />} />
            <Route path="/HuaqSymbol20" element={<HuaqSymbol20 />} />
            
            <Route path="/HuaqQR" element={<HuaqQR />} />
            
            <Route path="/HuaqCamera" element={<HuaqCamera />} />

          </Routes>
        </MyContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;
