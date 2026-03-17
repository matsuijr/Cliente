import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CrearVehiculo.css"; // misma hoja que login/registro

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
  // maneja el cambio de los inputs y actualiza el estado del formulario
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
    // Prepara los datos del formulario para enviarlos al backend incluyendo la imagen si se seleccionó
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

    await res.json();
    alert("Vehículo publicado");
    navigate("/misVehiculos");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
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

        <button className="btn-submit">Publicar</button>
      </form>
    </div>
  );
}

export default CrearVehiculo;
