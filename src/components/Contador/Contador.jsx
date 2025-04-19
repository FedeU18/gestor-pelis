//componente de adorno pq al final no lo usamos nada xd
import styles from "./Contador.module.css";

const Contador = ({items}) => {
  const cantPelis = items.filter((item) => item.tipo === "Pelicula").length;
  const cantSeries = items.filter((item) => item.tipo === "Serie").length;

  const generosContados = items.reduce((acum, item) => {
    acum[item.genero] = (acum[item.genero] || 0) + 1;
    return acum;
  }, {});

  return (
    <div className={styles.contador}>
        Total: {cantPelis + cantSeries} <br />
        Peliculas: {cantPelis} <br />
        Series: {cantSeries} <br />
        Generos: <br />
        {Object.entries(generosContados).map(([genero, cantidad]) => (
          <div key={genero}>
            {genero}: {cantidad}
          </div>
        ))}
    </div>
  )
}

export default Contador;