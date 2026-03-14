import { useState } from "react";
import { crearVehiculo } from "../Js/vehiculo";
import { useNavigate } from "react-router-dom";

function CrearVehiculo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anio: "",
    precio: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debe iniciar sesión para publicar");
      return;
    }

    await crearVehiculo(form);

    alert("Vehículo publicado");

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Publicar Vehículo</h2>

      <input
        name="marca"
        placeholder="Marca"
        onChange={handleChange}
        required
      />
      <input
        name="modelo"
        placeholder="Modelo"
        onChange={handleChange}
        required
      />
      <input name="anio" placeholder="Año" onChange={handleChange} required />
      <input
        name="precio"
        placeholder="Precio"
        onChange={handleChange}
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        onChange={handleChange}
      />

      <button>Publicar</button>
    </form>
  );
}

export default CrearVehiculo;
