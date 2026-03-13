import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/navbar";
import Home from "./Paginas/Home";
import Login from "./Paginas/Login";
import Registro from "./Paginas/Registro";
import DetalleVehiculo from "./Paginas/DetalleVehiculo";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
      </Routes>
    </>
  );
}

export default App;
