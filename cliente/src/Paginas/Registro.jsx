import { useState } from "react";
import { registrarUsuario } from "../Js/api";

function Registro() {
  // Estados del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    edad: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Maneja cambios en inputs
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
      const data = await registrarUsuario(form);
      setMensaje(data.mensaje || "Usuario registrado");
    } catch (error) {
      setMensaje("Error al registrar");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registro</h2>

      <form onSubmit={manejarRegistro}>
        <input name="nombre" placeholder="Nombre" onChange={manejarCambio} />
        <br />
        <br />

        <input
          name="apellidos"
          placeholder="Apellidos"
          onChange={manejarCambio}
        />
        <br />
        <br />

        <input name="email" placeholder="Correo" onChange={manejarCambio} />
        <br />
        <br />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={manejarCambio}
        />
        <br />
        <br />

        <input name="edad" placeholder="Edad" onChange={manejarCambio} />
        <br />
        <br />

        <button type="submit">Registrar</button>
      </form>

      <p>{mensaje}</p>
    </div>
  );
}

export default Registro;
