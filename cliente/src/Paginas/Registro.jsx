import { useState } from "react";
import { registrarUsuario } from "../Js/api";
import { useNavigate } from "react-router-dom";
import "../Styles/registro.css";

function Registro() {
  const navigate = useNavigate();
  // Estados del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    edad: "",
  });

  const [mensaje, setMensaje] = useState("");

  // manejo de cambios en el formulario
  const manejarCambio = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Envío del formulario
  const manejarRegistro = async (e) => {
    e.preventDefault();

    try {
      // Llamada a la API para registrar el usuario
      const data = await registrarUsuario(form);
      setMensaje(data.mensaje || "Usuario registrado");
    } catch (error) {
      setMensaje("Error al registrar");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={manejarRegistro}>
        <h2>Registro</h2>

        <input name="nombre" placeholder="Nombre" onChange={manejarCambio} />
        <input
          name="apellidos"
          placeholder="Apellidos"
          onChange={manejarCambio}
        />
        <input name="email" placeholder="Correo" onChange={manejarCambio} />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={manejarCambio}
        />
        <input name="edad" placeholder="Edad" onChange={manejarCambio} />

        <button type="submit">Registrar</button>
        <p className="login-link">
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/login")}>Inicia sesión</span>
        </p>
      </form>

      <p>{mensaje}</p>
    </div>
  );
}

export default Registro;
