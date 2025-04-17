import { useState } from "react";
import Button from "../../components/Button/Button";
const Home = () => {
  const [vista, setVista] = useState(true);
  return (
    <>
      {vista ? <p>Pelis por ver</p> : <p>PelisVistas</p>}
      <button onClick={() => setVista(!vista)}>
        {vista ? "Pelis por ver" : "PelisVistas"}
      </button>
    </>
  );
};

export default Home;
