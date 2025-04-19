import styles from "./Search.module.css";

const Search = ({ valor, onCambio }) => {
  return (
    <input
      type="text" placeholder="Buscar por título o director"
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
      className={styles.input}
    />
  );
};

export default Search;