import React from "react";
import styles from "./FloatingButton.module.css";

const FloatingButton = ({ onClick, children, red }) => {
  return (
    <button
      className={`${styles.botonFlotante} ${red ? styles.redButton : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FloatingButton;