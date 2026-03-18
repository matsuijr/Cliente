import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verificarToken } from "../Js/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const valid = await verificarToken();
      setIsAuthenticated(valid);
    };
    checkToken();
  }, []);
  // si no esta autenticado, redirige a la página de inicio
  if (!isAuthenticated) {
    alert("No puedes acceder sin registrarte");
    return <Navigate to="/" replace />;
  }

  return children; // children es el componente que se renderiza si el usuario esta autenticado, en este caso DetalleVehiculo, CrearVehiculo, Vehiculos o Chats dependiendo de la ruta a la que se acceda
};

export default ProtectedRoute;
