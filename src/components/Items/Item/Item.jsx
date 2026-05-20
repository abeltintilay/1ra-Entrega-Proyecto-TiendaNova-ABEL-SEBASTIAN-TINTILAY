import { useState } from "react";
import styles from "./Item.module.css";

export function Item({ nombre, precio, stock, imagen }) {
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

      <button onClick={CompraClick} className={styles.boton}>
        Comprar
      </button>

      <span
            onClick={marcarComoFavorito} 
            className={styles.favorito}>
              
            {esFavorito ? "⭐" : "☆"}
      </span>
    </div>
  );
}
