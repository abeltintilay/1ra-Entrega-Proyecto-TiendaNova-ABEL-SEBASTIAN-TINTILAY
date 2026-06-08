import { useState } from "react";
import styles from "./Item.module.css";

import { Link } from "react-router-dom";

export function Item({id, nombre, precio, stock, imagen }) {
  const [esFavorito, setEsFavorito] = useState(false);

  const CompraClick = () => {
    // Quiero que se ejecute cuando le doy clic
    alert(`¡Agregaste ${nombre} al chango!`);
  };

  //FUNICION marcarComoFavorito
  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className={styles.card}>
      <img className={styles.imagen} src={imagen} alt={nombre} />

      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <p>Stock disponible: {stock}</p>

      {/* Aqui crearemos rutas dinamicas */}
      <p> <Link to={`/productos/${id}`}>Ver mas informacion</Link></p>  

      <button onClick={CompraClick} className={styles.boton}>
        Comprar
      </button>

      <div className={styles.favoritoContainer}>
            <span
                  onClick={marcarComoFavorito} 
                  className={styles.favorito}    
            >
                    
                  {esFavorito ? "⭐" : "☆"}
            </span>
      </div>  
    </div>
  );
}
