const API_URL = "http://localhost:3001/api/auth";

//Funcion para registrar un usuario
export async function registrarUsuario(datos) {
  const respuesta = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return respuesta.json();
}
//Funcion para loguearse en el sistema
export async function loginUsuario(datos) {
  const respuesta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return respuesta.json();
}

//Funcion para verificar el token
export async function verificarToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const respuesta = await fetch(`${API_URL}/protegida`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respuesta.ok;
  } catch (error) {
    return false;
  }
}
