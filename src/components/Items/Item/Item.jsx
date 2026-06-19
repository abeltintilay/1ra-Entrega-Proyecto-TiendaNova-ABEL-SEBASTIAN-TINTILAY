import { useState } from "react";
import styles from "./Item.module.css";

import { Link } from "react-router-dom";

/*************************** */
// voy a importar el contador
import Contador from "../Contador/Contador";
/***************************/
import { useCart } from "../../../context/CartContext";

export function Item({ id, nombre, precio, stock, imagen }) {
  const [esFavorito, setEsFavorito] = useState(false);

  /*
  const CompraClick = () => {
    // Quiero que se ejecute cuando le doy clic
    alert(`¡Agregaste ${nombre} al chango!`);
  };


  */
  //FUNICION marcarComoFavorito
  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  /***************************************/
  const producto = { id, nombre, precio, stock, imagen };
  

  const { addToCart } = useCart();

  const handleAdd = (cantidad) => {
    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
  };

  /***********************************/

  return (
    <div className={styles.card}>
      <img className={styles.imagen} src={imagen} alt={nombre} />

      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <p>Stock disponible: {stock}</p>

      {/* Aqui crearemos rutas dinamicas */}
      <p>
        {" "}
        <Link to={`/productos/${id}`}>Ver mas informacion</Link>
      </p>

      {/* Aqui va el contador */}
      <Contador stock={stock} onAdd={handleAdd} />

      <div className={styles.favoritoContainer}>
        <span onClick={marcarComoFavorito} className={styles.favorito}>
          {esFavorito ? "⭐" : "☆"}
        </span>
      </div>
    </div>
  );
}
