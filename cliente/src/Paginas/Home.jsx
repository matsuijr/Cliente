import { useEffect, useState } from "react";
import { obtenerVehiculos } from "../Js/vehiculo";
import { Link, useSearchParams } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  // estados para filtros y resultados de búsqueda de vehículos
  const [vehiculos, setVehiculos] = useState([]);
  const [marca, setMarca] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [modelo, setModelo] = useState("");
  const [anioMin, setAnioMin] = useState("");
  const [anioMax, setAnioMax] = useState("");
  const [estado, setEstado] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const paginaActual = Number(searchParams.get("page")) || 1;
  // cada vez que cambie la página o los filtros, recargamos los vehículos
  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerVehiculos(paginaActual, {
        marca,
        modelo,
        precioMin,
        precioMax,
        minYear: anioMin,
        maxYear: anioMax,
        estado,
      });
      setVehiculos(data);
    };
    cargar();
  }, [
    paginaActual,
    marca,
    precioMin,
    precioMax,
    modelo,
    anioMin,
    anioMax,
    estado,
  ]);
  // al hacer click en buscar, volvemos a la página 1 para mostrar los resultados desde el inicio
  const buscar = () => {
    setSearchParams({ page: 1 });
  };

  return (
    <div>
      {/* FILTROS */}
      <div className="filtros">
        <div className="filtros-form">
          <input
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <input
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
          <input
            placeholder="Año Min"
            value={anioMin}
            onChange={(e) => setAnioMin(e.target.value)}
          />
          <input
            placeholder="Año Max"
            value={anioMax}
            onChange={(e) => setAnioMax(e.target.value)}
          />
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Todos</option>
            <option value="disponible">Disponible</option>
            <option value="vendido">Vendido</option>
          </select>
          <input
            placeholder="Precio Min"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
          />
          <input
            placeholder="Precio Max"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
        <button className="btn-buscar" onClick={buscar}>
          Buscar
        </button>
      </div>

      {/* GRID */}
      <div className="grid-vehiculos">
        {vehiculos.map((v) => {
          // si hay imagen en el backend la mostramos
          const imagen = v.imagenes?.[0]
            ? `http://localhost:3001${v.imagenes[0]}`
            : "https://via.placeholder.com/400x200";

          return (
            <div className="card-vehiculo" key={v._id}>
              <img src={imagen} className="img-vehiculo" alt="vehículo" />
              <div className="info-vehiculo">
                <h3>
                  {v.marca} {v.modelo}
                </h3>
                <p>Año: {v.anio}</p>
                <p className="precio">₡{v.precio}</p>
                <Link
                  to={`/vehiculo/${v._id}?page=${paginaActual}`}
                  className="btn-detalle"
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINACION */}
      <div className="paginacion">
        <button
          onClick={() => setSearchParams({ page: paginaActual - 1 })}
          disabled={paginaActual === 1}
        >
          ← Anterior
        </button>
        <span style={{ margin: "0 10px" }}>Página {paginaActual}</span>
        <button onClick={() => setSearchParams({ page: paginaActual + 1 })}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default Home;
