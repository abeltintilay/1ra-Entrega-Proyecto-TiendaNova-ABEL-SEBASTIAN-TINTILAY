import styles from "./Cart.module.css";

// src/componentes/Cart/Cart.jsx
import React from "react";
const Cart = () => {
  // Por ahora, este componente solo mostrará un mensaje.
  // Más adelante, consumirá los datos de nuestro contexto.
  return (
    <div className={styles.cartContainer}>
          <h1 className={styles.titulo}>Carrito de Compras</h1>
          <div>
            <img src="/images/imgProductos/1-notebook.jpg"
            alt="notebook" />
            <h3 className={styles.texto}>Notebook</h3>
            <p className={styles.texto}>Precio $1000000</p>
          </div>          
    </div>
  );
};
export default Cart;
