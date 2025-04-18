import React from "react";
import styles from "./FloatingButton.module.css";

const FloatingButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.botonFlotante}>
      {children}
    </button>
  );
};

export default FloatingButton;