import { useEffect, useState } from "react";
import { obtenerVehiculos } from "../Js/vehiculo";
import { Link } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  const [vehiculos, setVehiculos] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerVehiculos(pagina);
      setVehiculos(data);
    };

    cargar();
  }, [pagina]);

  return (
    <div>
      <div className="grid-vehiculos">
        {vehiculos.map((v) => {
          const imagen =
            v.imagenes?.length > 0
              ? v.imagenes[0]
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

                <Link to={`/vehiculo/${v._id}`} className="btn-detalle">
                  Ver detalle
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINACION */}

      <div style={{ textAlign: "center", margin: "20px" }}>
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
          ← Anterior
        </button>

        <span style={{ margin: "0 10px" }}>Página {pagina}</span>

        <button onClick={() => setPagina(pagina + 1)}>Siguiente →</button>
      </div>
    </div>
  );
}

export default Home;
