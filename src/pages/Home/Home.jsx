import { useState, useEffect } from "react";
import FloatingButton from "../../components/Button/FloatingButton";
import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";
import Search from "../../components/Search/Search";

import styles from "./Home.module.css";

const datosPorDefecto = [
  {
    titulo: "The Shawshank Redemption",
    director: "Frank Darabont",
    anio: 1994,
    genero: "Drama",
    rating: 4,
    tipo: "Pelicula",
    imagen: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    visto: false,
  },
  {
    titulo: "Breaking Bad",
    director: "Vince Gilligan",
    anio: 2008,
    genero: "Crimen",
    rating: 5,
    tipo: "Serie",
    imagen: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    visto: true,
  },
  {
    titulo: "Inception",
    director: "Christopher Nolan",
    anio: 2010,
    genero: "Ciencia Ficción",
    rating: 3,
    tipo: "Pelicula",
    imagen: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    visto: false,
  },
  {
    titulo: "Stranger Things",
    director: "The Duffer Brothers",
    anio: 2016,
    genero: "Fantasía",
    rating: 3,
    tipo: "Serie",
    imagen: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    visto: true,
  },
  {
    titulo: "The Godfather",
    director: "Francis Ford Coppola",
    anio: 1972,
    genero: "Crimen",
    rating: 5,
    tipo: "Pelicula",
    imagen: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    visto: false,
  },
  {
    titulo: "Spiderman",
    director: "Justin Roiland",
    anio: 2013,
    genero: "Acción",
    rating: 5,
    tipo: "Pelicula",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/e/e0/The_Amazing_Spider-Man_%28film%29_poster.jpg",
    visto: false,
  },
  {
    titulo: "One Piece",
    director: "Eiichiro Oda",
    anio: 1997,
    genero: "Aventura",
    rating: 5,
    tipo: "Serie",
    imagen: "https://i.imgur.com/TeV9uws.jpeg",
    visto: false,
  },
];

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
    } else {
      // Si no hay nada en localStorage, usamos datos por defecto
      setItems(datosPorDefecto);
      localStorage.setItem("peliculasSeries", JSON.stringify(datosPorDefecto));
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
  
  const [busqueda, setBusqueda] = useState("");

  //filtramos los items según la búsqueda y la vista seleccionada
  const itemsFiltrados = (vista
    ? items.filter((item) => !item.visto)
    : items.filter((item) => item.visto)
  ).filter((item) =>
    item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.director.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <title texto="Gestor de Películas y Series" />

      <Search valor={busqueda} onCambio={setBusqueda} />

      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Limpiar localStorage
      </button>
      <br />
      <button onClick={() => setVista(!vista)}>
        {vista ? "Pelis por ver" : "Pelis Vistas"}
      </button>

      {vista ? <p>Pelis Vistas</p> : <p>Pelis por ver</p>}

      <FloatingButton onClick={() => setMostrarFormulario(true)}>
        +
      </FloatingButton>

      <div className={styles.grid}>
        {itemsFiltrados.map((item, index) => (
          <Card
            key={index}
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
