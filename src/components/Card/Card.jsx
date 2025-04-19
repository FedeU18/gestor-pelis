import styles from "./Card.module.css";

const Card = ({ titulo, director, año, genero, rating, tipo, imagen, visto }) => {
    const renderEstrellitas = (rating) => {
      const cantidad = Math.floor(rating);
      const estrellitas = [];
        
      //devuelve las estrellas llenas y vacías según el rating
      for (let i = 1; i <= 5; i++) {
        if (i <= cantidad) {
          estrellitas.push(<span key={i} className={styles.estrellitasLlenas}>★</span>);
        /* } else if (i - rating <= 0.5) {
          estrellitas.push(<span key={i} className={styles.estrellitaMitad}></span>); */
        } else {
          estrellitas.push(<span key={i} className={styles.estrellitasVacias}>☆</span>);
        }
      }
      return estrellitas;
    };
  
    return (
      <div className={styles.card}>
        <img src={imagen} alt={titulo} className={styles.imagen} />
        <div className={styles.contenido}>
          <h3 className={styles.title}>{titulo}</h3>
          <p><span className={styles.label}>Tipo:</span> <span className={styles.info}>{tipo}</span></p>
          <p><span className={styles.label}>Director:</span> {director}</p>
          <p><span className={styles.label}>Género:</span> <span className={styles.info}>{genero}</span></p>
          <p><span className={styles.label}>Año:</span> {año}</p>
          <div className={styles.vistoIcono}>
            {visto ? (
              <span>Vista: ✅</span>
            ) : (
              <span>Vista: ❌</span>
            )}
          </div>
          <div className={styles.estrellitas}>
            {renderEstrellitas(rating)}
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;