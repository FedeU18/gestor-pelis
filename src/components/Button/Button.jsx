import styles from "./Button.module.css";

const Button = ({ onClick, children, red }) => {
  return (
    <button
      className={`${styles.button} ${red ? styles.redButton : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
