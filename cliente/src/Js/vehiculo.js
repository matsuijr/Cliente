const API = "http://localhost:3001/api/vehiculos";

//Obtenemos todos los vehiculos registrados en el sistema
export const obtenerVehiculos = async (page, filtros) => {
  let url = `http://localhost:3001/api/vehiculos?page=${page}&limit=6`;

  if (filtros.marca) url += `&marca=${filtros.marca}`;
  if (filtros.modelo) url += `&modelo=${filtros.modelo}`;
  if (filtros.estado) url += `&estado=${filtros.estado}`;
  if (filtros.precioMin) url += `&precioMin=${filtros.precioMin}`;
  if (filtros.precioMax) url += `&precioMax=${filtros.precioMax}`;
  if (filtros.minYear) url += `&minYear=${filtros.minYear}`;
  if (filtros.maxYear) url += `&maxYear=${filtros.maxYear}`;

  const res = await fetch(url);
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

export const obtenerMisVehiculos = async (page = 1, filtros = {}) => {
  const token = localStorage.getItem("token");

  let url = `http://localhost:3001/api/vehiculos/mis?page=${page}&limit=6`;

  if (filtros.marca) {
    url += `&marca=${filtros.marca}`;
  }

  if (filtros.precioMin) {
    url += `&precioMin=${filtros.precioMin}`;
  }

  if (filtros.precioMax) {
    url += `&precioMax=${filtros.precioMax}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
