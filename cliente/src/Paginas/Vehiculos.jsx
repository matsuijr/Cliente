import { useEffect, useState } from "react";
import { obtenerMisVehiculos } from "../Js/vehiculo";
import { Link, useSearchParams } from "react-router-dom";
import "../Styles/Home.css";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [anioMin, setAnioMin] = useState("");
  const [anioMax, setAnioMax] = useState("");
  const [estado, setEstado] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const paginaActual = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerMisVehiculos(paginaActual, {
        marca,
        precioMin,
        precioMax,
        modelo,
        minYear: anioMin,
        maxYear: anioMax,
        estado,
      });

      setVehiculos(Array.isArray(data) ? data : []);
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

  const buscar = () => {
    setSearchParams({ page: 1 });
  };

  return (
    <div>
      {/* BOTON PUBLICAR */}

      <div style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/crear">
          <button>Publicar Vehículo</button>
        </Link>
      </div>

      {/* FILTROS */}

      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
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

        <button onClick={buscar}>Buscar</button>
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
              <img src={imagen} className="img-vehiculo" />

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

      <div style={{ textAlign: "center", margin: "20px" }}>
        <button onClick={() => setSearchParams({ page: paginaActual - 1 })}>
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

export default Vehiculos;
