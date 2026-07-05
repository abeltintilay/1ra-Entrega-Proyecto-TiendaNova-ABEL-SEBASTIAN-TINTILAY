import styles from "./Cart.module.css";

// src/componentes/Cart/Cart.jsx
import React from "react";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

const Cart = () => {
  // Por ahora, este componente solo mostrará un mensaje.
  // Más adelante, consumirá los datos de nuestro contexto.

  const { cart, clearCart, getCartTotal } = useCart();

  
 return (
    <div className={styles.cartContainer}>
      
      {/* si el carrito esta vacio */}
      {cart.length === 0 ? (
        <div>
          <h2>El carrito está vacío</h2>
          <p className={styles.texto}>
            Agrega productos para continuar la compra.
          </p>

          <Link to="/" className={styles.linkVolver}>
            Volver al inicio
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className={styles.producto}>
              <img
                src={item.imagen}
                alt={item.nombre}
                className={styles.imagenProducto}
              />

              <div className={styles.detalleProducto}>
                <h4 className={styles.nombreProducto}>{item.nombre}</h4>
                <p className={styles.detalle}>Cantidad: {item.quantity}</p>
                <p className={styles.detalle}>Precio unitario: ${item.precio}</p>
                <p className={styles.detalle}>
                  Subtotal: ${item.precio * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <h3 className={styles.total}>
            Total a pagar: ${getCartTotal()}
          </h3>

          <button className={styles.botonVaciar} onClick={clearCart}>
            Vaciar Carrito
          </button>


          <Link to="/"
              className={styles.linkVolver}
              onClick={()=>{
              alert("Gracias por comprar");
              clearCart()}}
          > 
              Finalizar Compra 
          </Link>


          <Link to="/" className={styles.linkVolver}>
            Seguir comprando
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;