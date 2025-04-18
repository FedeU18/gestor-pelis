import { useState, useEffect } from "react";
import styles from "./Form.module.css";

function Form({ onGuardar, onCancelar, onEditar }) {
    const [titulo, setTitulo] = useState("");
    const [director, setDirector] = useState("");
    const [anio, setAnio] = useState("");
    const [genero, setGenero] = useState("");
    const [rating, setRating] = useState(0);
    const [tipo, setTipo] = useState("");
    const [imagen, setImagen] = useState("");

    useEffect(() => {
        if (onEditar) {
            setTitulo(onEditar.titulo || "");
            setDirector(onEditar.director || "");
            setAnio(onEditar.anio || "");
            setGenero(onEditar.genero || "");
            setRating(onEditar.rating || "");
            setTipo(onEditar.tipo || "");
            setImagen(onEditar.imagen || "");
        }
    }, [onEditar]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!titulo || !director || !anio || !genero || !rating || !tipo || !imagen) {
            alert("Por favor completá todos los campos.");
            return;
        }

        const item = {
            titulo,
            director,
            anio,
            genero,
            rating,
            tipo,
            imagen,
        };

        onGuardar(item);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={onCancelar} className={styles.closeButton}>×</button>
                <h2>{onEditar ? "Editar ítem" : "Agregar ítem"}</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label>Título:</label>
                        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label>Director:</label>
                        <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label>Año:</label>
                        <input type="number" value={anio} onChange={(e) => setAnio(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label>Género:</label>
                        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                            <option value="">Seleccionar género</option>
                            <option value="Acción">Acción</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Drama">Drama</option>
                            <option value="Terror">Terror</option>
                            <option value="Fantasía">Fantasía</option>
                            <option value="Ciencia ficción">Ciencia ficción</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Tipo:</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="">Seleccionar tipo</option>
                            <option value="Película">Película</option>
                            <option value="Serie">Serie</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Imagen (url):</label>
                        <input type="url" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label>Rating:</label>
                        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="0" max="10" step="0.1" />
                    </div>

                    <div className={styles.buttons}>
                        <button type="submit">{onEditar ? "Actualizar" : "Agregar"}</button>
                        <button type="button" onClick={onCancelar}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;