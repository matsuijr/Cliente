import { Link, useNavigate } from "react-router-dom";
import "../Styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Cierra sesión eliminando el token
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TicoAutos</h2>

      <div className="nav-links">
        {/* Visible para todos */}
        <Link to="/">Vehículos</Link>

        {/* Usuario NO autenticado */}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registro" className="btn-registro">
              Registrarse
            </Link>
          </>
        )}

        {/* Usuario autenticado */}
        {token && (
          <button className="btn-logout" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
