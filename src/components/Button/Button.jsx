import styles from "./Button.module.css";

const Button = ({ onClick, children, red, black }) => {
  return (
    <button
      className={`${styles.button} ${red ? styles.redButton : ''} ${black ? styles.blackButton : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
