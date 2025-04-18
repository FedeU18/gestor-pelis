import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import FloatingButton from "../../components/Button/FloatingButton";
import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";
import styles from "./Home.module.css";

const Home = () => {
  const [vista, setVista] = useState(true);
  const [items, setItems] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("peliculasSeries");
    if (datosGuardados) {
      try {
        const parsed = JSON.parse(datosGuardados);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("peliculasSeries", JSON.stringify(items));
    }
  }, [items]);

  const agregarItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <>
      <title texto="Gestor de Películas y Series" />

      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Limpiar localStorage
      </button>

      {vista ? <p>Pelis por ver</p> : <p>PelisVistas</p>}

      <button onClick={() => setVista(!vista)}>
        {vista ? "Pelis por ver" : "PelisVistas"}
      </button>

      <FloatingButton onClick={() => setMostrarFormulario(true)}>+</FloatingButton>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <Card
            key={index} // Usa un índice como key temporalmente (mejor usar un ID único si está disponible)
            titulo={item.titulo}
            director={item.director}
            año={item.anio}
            genero={item.genero}
            rating={item.rating}
            tipo={item.tipo}
            imagen={item.imagen}
          />
        ))}
      </div>

      {mostrarFormulario && (
        <Form
          onCancelar={() => setMostrarFormulario(false)}
          onGuardar={(item) => {
            agregarItem(item);
            setMostrarFormulario(false);
          }}
        />
      )}
    </>
  );
};

export default Home;
