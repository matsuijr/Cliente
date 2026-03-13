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
