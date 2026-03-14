const API = "http://localhost:3001/api/vehiculos";
//Obtenemos todos los vehiculos registrados en el sistema
export const obtenerVehiculos = async (page = 1) => {
  const res = await fetch(
    `http://localhost:3001/api/vehiculos?page=${page}&limit=6`,
  );

  return await res.json();
};
//Obtenemos un vehiculo por id
export const obtenerVehiculoPorId = async (id) => {
  const res = await fetch(`${API}/${id}`);

  return await res.json();
};
//Creamos un Vehiculo
export const crearVehiculo = async (vehiculo) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3001/api/vehiculos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vehiculo),
  });

  return await res.json();
};
