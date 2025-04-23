import { useState, useEffect } from "react";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";
import Filtros from "../../components/Filtros/Filtros";
import Button from "../../components/Button/Button";
import styles from "./Home.module.css";
import Title from "../../components/Title/Title";
import stylesTitulo from "../../components/Title/Title.module.css";

const datosPorDefecto = [
  {
    titulo: "The Shawshank Redemption",
    director: "Frank Darabont",
    anio: 1994,
    genero: "Drama",
    rating: 4,
    tipo: "Película",
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
    tipo: "Película",
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
    tipo: "Película",
    imagen: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    visto: false,
  },
  {
    titulo: "Spiderman",
    director: "Justin Roiland",
    anio: 2013,
    genero: "Acción",
    rating: 5,
    tipo: "Película",
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
  const [vista, setVista] = useState("todo");
  const [items, setItems] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [itemEditado, setItemEditado] = useState(null);
  const [ordenarAnio, setOrdenarAnio] = useState("asc");
  const [ordenarRating, setOrdenarRating] = useState("asc");
  const [ordenActivo, setOrdenActivo] = useState("anio"); // por defecto

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

  const [filtros, setFiltros] = useState({
    genero: "Todos",
    tipo: "Todos",
  });

  //filtramos los items según la búsqueda y la vista seleccionada
  const itemsFiltrados = items
    .filter((item) => {
      if (vista === "visto") return item.visto;
      if (vista === "no visto") return !item.visto;
      return true;
    })
    .filter(
      (item) =>
        item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.director.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter(
      (item) =>
        (filtros.genero === "Todos" || item.genero === filtros.genero) &&
        (filtros.tipo === "Todos" || item.tipo === filtros.tipo)
    )
    .sort((a, b) => {
      if (ordenActivo === "anio") {
        return ordenarAnio === "asc" ? a.anio - b.anio : b.anio - a.anio;
      } else if (ordenActivo === "rating") {
        return ordenarRating === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className={styles.conte}>
      <Title
        className={stylesTitulo.titulo}
        texto={
          vista === "visto"
            ? "Contenido visto"
            : vista === "no visto"
              ? "Contenido por ver"
              : "Gestor de películas y series"
        }
      />
      <div className={styles.contenido}>

        <div className={styles.filtrosWrapper}>
          <Filtros
            items={items}
            filtros={filtros}
            setFiltros={setFiltros}
            valorBusqueda={busqueda}
            onCambioBusqueda={setBusqueda}
            vista={vista}
            setVista={setVista}
            ordenarAnio={ordenarAnio}
            setOrdenarAnio={setOrdenarAnio}
            ordenarRating={ordenarRating}
            setOrdenarRating={setOrdenarRating}
            setOrdenActivo={setOrdenActivo}
          />
        </div>

        <div className={styles.principal}>

          <FloatingButton onClick={() => setMostrarFormulario(true)}>
            +
          </FloatingButton>

          <FloatingButton
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            red
          >
            🗑️
          </FloatingButton>

          <div className={styles.grid}>
            {/*verificar q no hayan series o peliculas*/}
            {itemsFiltrados.length === 0 ? (
              <p className={styles.noHay}>
                No se encontraron películas o series
              </p>
            ) : (
              itemsFiltrados.map((item, index) => (
                <Card
                  key={index}
                  titulo={item.titulo}
                  director={item.director}
                  año={item.anio}
                  genero={item.genero}
                  rating={item.rating}
                  tipo={item.tipo}
                  imagen={item.imagen}
                  visto={item.visto}
                  //editar y eliminar cards
                  onEditar={() => {
                    setItemEditado(item);
                    setMostrarFormulario(true);
                  }}
                  onEliminar={() => {
                    //funcion de confirmacion de js
                    const confirmacion = confirm(`¿Eliminar "${item.titulo}"?`);
                    if (confirmacion) {
                      const nuevosItems = items.filter((i) => i !== item);
                      setItems(nuevosItems);
                    }
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {mostrarFormulario && (
        <Form
          onCancelar={() => {
            setMostrarFormulario(false);
            //form editado
            setItemEditado(null);
          }}
          onEditar={itemEditado}
          onGuardar={(nuevoItem) => {
            if (itemEditado) {
              const nuevosItems = items.map((i) =>
                i === itemEditado ? nuevoItem : i
              );
              setItems(nuevosItems);
            } else {
              setItems((prev) => [...prev, nuevoItem]);
            }
            setMostrarFormulario(false);
            setItemEditado(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;
