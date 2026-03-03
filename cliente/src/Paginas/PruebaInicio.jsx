import "../Styles/PruebaInicio.css";

function PruebaInicio() {
  return (
    <div className="home">
      <h1>Vehículos disponibles</h1>

      {/*  mientras conectamos la API */}
      <div className="vehiculos-grid">
        <div className="card">
          <h3>Toyota Corolla</h3>
          <p>Año: 2020</p>
          <p>Precio: ₡8,500,000</p>
          <button>Ver más</button>
        </div>

        <div className="card">
          <h3>Honda Civic</h3>
          <p>Año: 2019</p>
          <p>Precio: ₡7,900,000</p>
          <button>Ver más</button>
        </div>
      </div>
    </div>
  );
}

export default PruebaInicio;
