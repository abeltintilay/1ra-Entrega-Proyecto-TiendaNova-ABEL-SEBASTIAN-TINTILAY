import styles from "./Cart.module.css";

// src/componentes/Cart/Cart.jsx
import React from "react";


import { useCart } from "../../context/CartContext";


const Cart = () => {
  // Por ahora, este componente solo mostrará un mensaje.
  // Más adelante, consumirá los datos de nuestro contexto.

  const { cart, clearCart, getCartTotal } = useCart();

  // Si el carrito está vacío, mostramos un mensaje
  if (cart.length === 0) {
    return (
      <div>
        <h1>El carrito está vacío</h1>
        <p>Agrega productos para continuar la compra.</p>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.titulo}>Carrito de Compras</h1>
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
                    <p className={styles.detalle}>Subtotal: ${item.precio * item.quantity}</p>
              </div>
        </div>
      ))}
      <h3 className={styles.total}>Total a pagar: ${getCartTotal()}</h3>

      <button
            className={styles.botonVaciar}
            onClick={clearCart}>Vaciar Carrito
      </button>
    </div>
  );
};
export default Cart;
