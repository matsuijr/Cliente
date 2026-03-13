import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerVehiculoPorId } from "../Js/vehiculo";

function DetalleVehiculo() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  //Llamamos a nuestra funcion de obtener un vehiculo por ID
  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerVehiculoPorId(id);
      setVehiculo(data);
    };

    cargar();
  }, [id]);

  if (!vehiculo) return <p>Cargando...</p>;

  return (
    <div>
      <h2>
        {vehiculo.marca} {vehiculo.modelo}
      </h2>

      <p>Año: {vehiculo.anio}</p>
      <p>Precio: ₡{vehiculo.precio}</p>
      <p>{vehiculo.descripcion}</p>

      <p>Publicado por: {vehiculo.propietario.nombre}</p>
    </div>
  );
}

export default DetalleVehiculo;
