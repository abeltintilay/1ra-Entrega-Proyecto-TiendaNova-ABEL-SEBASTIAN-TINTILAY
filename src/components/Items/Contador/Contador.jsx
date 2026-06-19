import { useState } from "react";
import styles from "./Contador.module.css";

const Contador = ({ stock, onAdd }) => {
  const [count, setCount] = useState(1);

  const incrementar = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrementar = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className={styles.contenedorContador}>
      <div className={styles.contador}>
            <button className={styles.botonContador} onClick={decrementar}>
              -
            </button>
            
            <span className={styles.cantidad}>Cantidad: {count}</span>

            <button className={styles.botonContador} onClick={incrementar}>
              +
            </button>

      </div>
            <button className={styles.botonAgregar} onClick={() => onAdd(count)}>
              🛒 Agregar al carrito
            </button>
       
    </div>
  );
};
export default Contador;
