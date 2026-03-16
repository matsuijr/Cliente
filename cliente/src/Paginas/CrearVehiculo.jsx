import { useState } from "react";
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

  const [imagenFile, setImagenFile] = useState(null);

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

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    if (imagenFile) {
      formData.append("imagen", imagenFile);
    }

    const res = await fetch("http://localhost:3001/api/vehiculos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
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

      <input
        type="file"
        name="imagen"
        onChange={(e) => setImagenFile(e.target.files[0])}
      />

      <button>Publicar</button>
    </form>
  );
}

export default CrearVehiculo;
