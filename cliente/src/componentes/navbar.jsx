import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/navbar.css";

function Navbar() {
  // Detecta el scroll para cambiar el estilo de la barra de navegación
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  // Agrega un listener para detectar el scroll y actualizar el estado de "scrolled"
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cierra sesion eliminando el token
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <h2 className="logo">TicoAutos</h2>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        {token && (
          <>
            <Link to="/misvehiculos">Vehículos</Link>
            <Link to="/chats">Chats</Link>
          </>
        )}
      </div>

      <div className="nav-actions">
        {token ? (
          <button className="btn-logout" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="btn-login">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
