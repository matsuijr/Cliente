import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/navbar";
import ProtectedRoute from "./componentes/ProtectedRoute";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/vehiculo/:id"
          element={
            <ProtectedRoute>
              <DetalleVehiculo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear"
          element={
            <ProtectedRoute>
              <CrearVehiculo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/misVehiculos"
          element={
            <ProtectedRoute>
              <Vehiculos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
