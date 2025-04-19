import styles from "./Filtros.module.css";
import Search from "../Search/Search";

const Filtros = ({ items, filtros, setFiltros, valorBusqueda, onCambioBusqueda }) => {
  const generosContados = items.reduce((acum, item) => {
    acum[item.genero] = (acum[item.genero] || 0) + 1;
    return acum;
  }, {});

  const tiposContados = items.reduce((acum, item) => {
    acum[item.tipo] = (acum[item.tipo] || 0) + 1;
    return acum;
  }, {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.filtros}>
      <h3>Filtros</h3>

      {/*comp search dentro de filtros*/}
      <Search valor={valorBusqueda} onCambio={onCambioBusqueda} />

      <label>Género:</label>
      <select name="genero" value={filtros.genero} onChange={handleChange}>
        <option value="Todos">Todos</option>
        {Object.entries(generosContados).map(([genero, cantidad]) => (
          <option key={genero} value={genero}>
            {genero} ({cantidad})
          </option>
        ))}
      </select>

      <label>Tipo:</label>
        <select name="tipo" value={filtros.tipo} onChange={handleChange}>
            <option value="Todos">Todos ({Object.values(tiposContados).reduce((acum, val) => acum + val, 0)})</option>
            {Object.entries(tiposContados).map(([tipo, cantidad]) => (
            <option key={tipo} value={tipo}> {tipo} ({cantidad})</option> ))}
        </select>
    </div>
  );
};

export default Filtros;