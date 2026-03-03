// URL base de tu backend
// Aquí centralizamos las llamadas HTTP para no repetir código
const API_URL = "http://localhost:3001/api/auth";

// ===============================
// REGISTRO
// ===============================
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

// ===============================
// LOGIN
// ===============================
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
