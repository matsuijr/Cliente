import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Aplicacion.jsx";
import { BrowserRouter } from "react-router-dom"; // habilita rutas

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
