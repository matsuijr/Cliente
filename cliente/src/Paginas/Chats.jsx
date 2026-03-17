import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Chats.css";

function Chats() {
  // Estado para almacenar las conversaciones
  const [conversaciones, setConversaciones] = useState({
    comoComprador: [],
    comoPropietario: [],
  });
  // Obtener token y usuario del localStorage para autenticación
  const token = localStorage.getItem("token");
  const usuarioData = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuarioData?._id;
  const navigate = useNavigate();
  // Cargar conversaciones al montar el componente
  useEffect(() => {
    if (!token || !usuarioId) return;

    axios
      .get(
        `http://localhost:3001/api/conversacion/usuario/${usuarioId}/conversaciones`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      // Guardar las conversaciones en el estado
      .then((res) => setConversaciones(res.data))
      .catch((err) => console.error(err));
  }, [token, usuarioId]);

  // Agrupar por vehículo
  const agruparPorVehiculo = (lista) => {
    const grupos = {};
    lista.forEach((c) => {
      // Usar el ID del vehículo como clave para agrupar
      const key = c.vehiculo?._id;
      if (!grupos[key]) {
        grupos[key] = {
          vehiculo: c.vehiculo,
          mensajes: [],
        };
      }
      // Agregar el mensaje a la lista de mensajes del grupo correspondiente
      grupos[key].mensajes.push(c);
    });
    return Object.values(grupos);
  };
  // Agrupar las conversaciones por vehículo para ambos roles
  const chatsComprador = agruparPorVehiculo(conversaciones.comoComprador);
  const chatsPropietario = agruparPorVehiculo(conversaciones.comoPropietario);

  return (
    <div className="chats-container">
      {/* Panel izquierdo */}
      <div className="panel-chats">
        <h3>Como Comprador</h3>
        <br />
        <br />
        {chatsComprador.length > 0 ? (
          chatsComprador.map((grupo) => (
            <div
              key={grupo.vehiculo?._id}
              className="chat-group"
              onClick={() => navigate(`/vehiculo/${grupo.vehiculo._id}`)}
            >
              <strong>
                {grupo.vehiculo?.marca} {grupo.vehiculo?.modelo}
              </strong>
              <div className="mensajes-preview">
                {grupo.mensajes.map((m, idx) => (
                  <p key={idx}>{m.texto}</p>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No tienes chats como comprador.</p>
        )}
      </div>

      {/* Panel derecho */}
      <div className="panel-chats">
        <h3>Como Propietario</h3>
        <br />
        <br />
        {chatsPropietario.length > 0 ? (
          chatsPropietario.map((grupo) => (
            <div
              key={grupo.vehiculo?._id}
              className="chat-group"
              onClick={() => navigate(`/vehiculo/${grupo.vehiculo._id}`)}
            >
              <strong>
                {grupo.vehiculo?.marca} {grupo.vehiculo?.modelo}
              </strong>
              <div className="mensajes-preview">
                {grupo.mensajes.map((m, idx) => (
                  <p key={idx}>
                    <em>{m.usuario?.nombre}:</em> {m.texto}
                  </p>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No tienes chats como propietario.</p>
        )}
      </div>
    </div>
  );
}

export default Chats;
