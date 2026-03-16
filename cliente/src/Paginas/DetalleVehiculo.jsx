import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerVehiculoPorId } from "../Js/vehiculo";

function DetalleVehiculo() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerVehiculoPorId(id);
      setVehiculo(data);
    };
    cargar();
  }, [id]);

  if (!vehiculo) return <p>Cargando...</p>;

  // si hay imagen en el backend la mostramos
  const imagen = vehiculo.imagenes?.[0]
    ? `http://localhost:3001${vehiculo.imagenes[0]}`
    : "https://via.placeholder.com/400x200";

  return (
    <div>
      <h2>
        {vehiculo.marca} {vehiculo.modelo}
      </h2>
      <img src={imagen} alt="vehículo" style={{ maxWidth: "400px" }} />
      <p>Año: {vehiculo.anio}</p>
      <p>Precio: ₡{vehiculo.precio}</p>
      <p>{vehiculo.descripcion}</p>
      <p>Publicado por: {vehiculo.propietario.nombre}</p>
    </div>
  );
}

export default DetalleVehiculo;
