import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerVehiculoPorId } from "../Js/vehiculo";
import ChatVehiculo from "../componentes/chatVehiculo";
import "../Styles/DetalleVehiculo.css";

function DetalleVehiculo() {
  // Obtener el ID del vehículo desde la URL
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  const usuarioToken = localStorage.getItem("token");
  const usuarioData = JSON.parse(localStorage.getItem("usuario"));

  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  // Cargar los detalles del vehículo al montar el componente o cuando cambie el ID
  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerVehiculoPorId(id);
      setVehiculo(data);
    };
    cargar();
  }, [id]);
  // Mostrar un mensaje de carga mientras se obtienen los datos del vehículo
  if (!vehiculo) return <p>Cargando...</p>;
  // Obtener la primera imagen del vehículo o usar una imagen de marcador de posición si no hay imágenes disponibles
  const imagen = vehiculo.imagenes?.[0]
    ? `http://localhost:3001${vehiculo.imagenes[0]}`
    : "https://via.placeholder.com/400x200";

  return (
    <div>
      <div className="detalle-vehiculo">
        {/* LADO IZQUIERDO */}
        <div className="vehiculo-info">
          <img
            src={imagen}
            alt="vehículo"
            className="vehiculo-img"
            onClick={() => setImagenSeleccionada(imagen)}
          />
          <div className="vehiculo-datos">
            <h2>
              {vehiculo.marca} {vehiculo.modelo}
            </h2>
            <p>
              <strong>Año:</strong> {vehiculo.anio}
            </p>
            <p>
              <strong>Precio:</strong> ₡{vehiculo.precio}
            </p>
            <p>
              <strong>Descripcion:</strong> {vehiculo.descripcion}
            </p>
            <p>
              <strong>Publicado por:</strong> {vehiculo.propietario.nombre}
            </p>
          </div>

          {/* Modal para ver imagen en grande */}
          {imagenSeleccionada && (
            <div className="modal" onClick={() => setImagenSeleccionada(null)}>
              <div className="modal-content">
                <img src={imagenSeleccionada} alt="vehículo grande" />
              </div>
            </div>
          )}
        </div>

        {/* LADO DERECHO */}
        <div className="vehiculo-chat">
          <ChatVehiculo
            vehiculoId={vehiculo._id}
            token={usuarioToken}
            usuarioId={usuarioData?._id}
            propietarioId={vehiculo.propietario._id}
          />
        </div>
      </div>
      <button
        className="btn-enlace"
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        Copiar enlace
      </button>
    </div>
  );
}

export default DetalleVehiculo;
