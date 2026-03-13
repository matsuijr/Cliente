const API = "http://localhost:3001/api/vehiculos";
//Obtenemos todos los vehiculos registrados en el sistema
export const obtenerVehiculos = async () => {
  const res = await fetch(API);

  return await res.json();
};
//Obtenemos un vehiculo por id
export const obtenerVehiculoPorId = async (id) => {
  const res = await fetch(`${API}/${id}`);

  return await res.json();
};
