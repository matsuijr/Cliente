import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // maneja cambios en los inputs y actualiza el estado del formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Envía login al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await resp.json();
      // Si el login es exitoso, guarda el token y el usuario en localStorage y redirige a la página principal
      if (resp.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario)); // guarda el usuario completo
        navigate("/");
      } else {
        alert(data.mensaje || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />

        <button type="submit">Entrar</button>

        <p className="register-link">
          ¿No tienes cuenta?{" "}
          <span onClick={() => navigate("/registro")}>Regístrate</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
