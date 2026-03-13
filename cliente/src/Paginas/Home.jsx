import { useEffect, useState } from "react";
import { obtenerVehiculos } from "../Js/vehiculo";
import { Link } from "react-router-dom";

function Home() {
  const [vehiculos, setVehiculos] = useState([]);
  //LLamamos a nuestra funcion que carga todos los vehiculos en el sistema
  useEffect(() => {
    const cargarVehiculos = async () => {
      const data = await obtenerVehiculos();
      setVehiculos(data);
    };

    cargarVehiculos();
  }, []);

  return (
    <div>
      <h2>Vehículos disponibles</h2>

      {vehiculos.map((v) => (
        <div
          key={v._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h3>
            {v.marca} {v.modelo}
          </h3>
          <p>Año: {v.anio}</p>
          <p>Precio: ₡{v.precio}</p>
          <Link to={`/vehiculo/${v._id}`}>Ver detalle</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
