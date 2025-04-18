import "./App.css";
import Home from "./pages/Home/Home";
import Card from "./components/Card/Card";

function App() {
  return (
    <>
      <Home />
      <Card
        titulo="Spiderman"
        director="Justin Roiland"
        año={2013}
        genero="Acción"
        rating={5}
        tipo="Película"
        imagen="https://upload.wikimedia.org/wikipedia/en/e/e0/The_Amazing_Spider-Man_%28film%29_poster.jpg"
      />
      <Card
        titulo="One Piece"
        director="Eiichiro Oda"
        año={1997}
        genero="Aventura"
        rating={5}
        tipo="Serie"
        imagen="https://i.imgur.com/TeV9uws.jpeg"
      />
    </>
  );
}

export default App;
