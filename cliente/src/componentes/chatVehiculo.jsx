import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/ChatVehiculo.css";

function ChatVehiculo({ vehiculoId, token, usuarioId, propietarioId }) {
  // Estado para almacenar el historial de preguntas y respuestas
  const [historial, setHistorial] = useState([]);
  const [texto, setTexto] = useState("");
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  // Verificar si el usuario actual es el propietario del vehículo
  const esPropietario = String(usuarioId) === String(propietarioId);

  // Cargar el historial de preguntas y respuestas al montar el componente
  useEffect(() => {
    if (!token) return;
    axios
      .get(
        `http://localhost:3001/api/conversacion/vehiculos/${vehiculoId}/conversacion`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setHistorial(res.data);
      })
      .catch((err) => console.error(err));
  }, [vehiculoId, token]);
  // Función para enviar una nueva pregunta o respuesta
  const enviarMensaje = async () => {
    try {
      if (esPropietario && preguntaSeleccionada) {
        await axios.post(
          `http://localhost:3001/api/respuestas/preguntas/${preguntaSeleccionada}/respuestas`,
          { texto },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        await axios.post(
          `http://localhost:3001/api/preguntas/vehiculos/${vehiculoId}/preguntas`,
          { texto },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
      }

      setTexto("");
      setPreguntaSeleccionada(null);
      // Recargar el historial después de enviar el mensaje
      const res = await axios.get(
        `http://localhost:3001/api/conversacion/vehiculos/${vehiculoId}/conversacion`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setHistorial(res.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        alert(error.response.data.mensaje);
      }
    }
  };

  // Filtrar mensajes del usuario seleccionado
  const mensajesFiltrados = usuarioSeleccionado
    ? historial.filter(
        (item) => item.pregunta.usuario._id === usuarioSeleccionado,
      )
    : [];

  // Lista única de usuarios que han preguntado
  const usuariosUnicos = [
    ...new Map(
      historial.map((item) => [
        item.pregunta.usuario._id,
        item.pregunta.usuario,
      ]),
    ).values(),
  ];

  return (
    <div className="chat-layout">
      {/* Lista de usuarios */}
      <div className="chat-users">
        <h4>Usuarios</h4>
        {usuariosUnicos.length > 0 ? (
          usuariosUnicos.map((u) => (
            <div
              key={u._id}
              className={`chat-user ${usuarioSeleccionado === u._id ? "activo" : ""}`}
              onClick={() => setUsuarioSeleccionado(u._id)}
            >
              {u.nombre}
            </div>
          ))
        ) : (
          <p>No hay usuarios aún.</p>
        )}
      </div>

      {/* Conversación */}
      <div className="chat-window">
        <h3>Chat del vehículo</h3>
        <div className="chat-messages">
          {mensajesFiltrados.map((item, idx) => (
            <div key={idx} className="mensaje-container">
              {/* La burbuja de la pregunta se diferencia según si es del usuario actual o de otro */}
              <div
                className={`bubble ${item.pregunta.usuario._id === usuarioId ? "mio" : "otro"}`}
              >
                <strong>{item.pregunta.usuario.nombre}:</strong>{" "}
                {item.pregunta.texto}
                <div className="meta">
                  Preguntado el{" "}
                  {/* Formateamos la fecha y hora de la pregunta */}
                  {new Date(item.pregunta.fecha).toLocaleDateString()} a las{" "}
                  {new Date(item.pregunta.fecha).toLocaleTimeString()} por{" "}
                  {item.pregunta.usuario.nombre}
                </div>
              </div>

              {item.respuesta ? (
                <div className="bubble respuesta">
                  <strong>{item.respuesta.usuario.nombre}:</strong>{" "}
                  {item.respuesta.texto}
                  <div className="meta">
                    Respondido el{" "}
                    {/* Formateamos la fecha y hora de la respuesta */}
                    {new Date(item.respuesta.fecha).toLocaleDateString()} a las{" "}
                    {new Date(item.respuesta.fecha).toLocaleTimeString()} por{" "}
                    {item.respuesta.usuario.nombre}
                  </div>
                </div>
              ) : (
                esPropietario && (
                  <button
                    className="btn-responder"
                    onClick={() => setPreguntaSeleccionada(item.pregunta._id)}
                  >
                    Responder
                  </button>
                )
              )}
            </div>
          ))}
        </div>

        <div className="chat-input">
          {/* El placeholder cambia según si el usuario es propietario y si hay una pregunta seleccionada */}
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={
              esPropietario && preguntaSeleccionada
                ? "Escribe tu respuesta..."
                : "Escribe tu pregunta..."
            }
          />
          <button onClick={enviarMensaje}>
            {esPropietario && preguntaSeleccionada ? "Responder" : "Preguntar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatVehiculo;
