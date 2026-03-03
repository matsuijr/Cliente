import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/navbar";
import Home from "./Paginas/PruebaInicio";
import Login from "./Paginas/Login";
import Registro from "./Paginas/Registro";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </>
  );
}

export default App;
