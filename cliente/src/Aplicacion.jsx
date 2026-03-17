import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/navbar";
import Home from "./Paginas/Home";
import Login from "./Paginas/Login";
import Registro from "./Paginas/Registro";
import DetalleVehiculo from "./Paginas/DetalleVehiculo";
import CrearVehiculo from "./Paginas/CrearVehiculo";
import Vehiculos from "./Paginas/Vehiculos";
import Chats from "./Paginas/Chats";

function App() {
  return (
    <>
      <Navbar />
      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/vehiculo/:id" element={<DetalleVehiculo />} />
        <Route path="/crear" element={<CrearVehiculo />} />
        <Route path="/misVehiculos" element={<Vehiculos />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </>
  );
}

export default App;
