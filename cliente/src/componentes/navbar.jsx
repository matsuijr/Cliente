import { Link, useNavigate } from "react-router-dom";
import "../Styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Cierra sesion eliminando el token
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TicoAutos</h2>

      <div className="nav-links">
        {/* Visible para todos */}
        <Link to="/">Inicio</Link>

        {/* Usuario autenticado */}
        {token && (
          <>
            <Link to="misvehiculos">Vehículos</Link>
            <Link to="/chats">Chats</Link>
            <button className="btn-logout" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        )}
        {/* Usuario NO autenticado */}
        {!token && <Link to="/login">Iniciar sesión</Link>}
      </div>
    </nav>
  );
}

export default Navbar;
