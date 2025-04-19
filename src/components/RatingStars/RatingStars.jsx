import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./RatingStars.module.css";

const RatingStars = ({ rating = 0, onChange, editable = false, className = "" }) => {
  const handleClick = (value) => {
    if (editable && onChange) {
      // Desmarca al clickear en una estrella ya seleccionada
      onChange(value === rating ? 0 : value);
    }
  };

  const estrellas = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Estrella completa
      estrellas.push(
        <FaStar
          key={i}
          className={`${styles.estrella} ${styles.activa}`}
          onClick={() => handleClick(i)}
        />
      );
    } else {
      // Estrella vacía
      estrellas.push(
        <FaRegStar
          key={i}
          className={styles.estrella}
          onClick={() => handleClick(i)}
        />
      );
    }
  }

  return <div className={`${styles.contenedor} ${className}`}>{estrellas}</div>;
};

export default RatingStars;