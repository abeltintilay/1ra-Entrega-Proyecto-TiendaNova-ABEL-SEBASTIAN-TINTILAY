import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import styles from "./ItemDetalle.module.css";
/*************/
import { useNavigate } from "react-router-dom";



const ItemDetalle = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [producto, setProducto] = useState(null); // ver si el producto existe o no, si no existe, mostrar mensaje de error
  const [error, setError] = useState(null); // para manejar errores de carga
  const [cargando, setCargando] = useState(true); // para manejar el estado de carga



  useEffect(() => {
    fetch(`/data/productos.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar el producto");
        }
        return response.json();
      })

      .then((data) => {
        const productoEncontrado = data.find(
          (item) => item.id === parseInt(id),
        );

        if (!productoEncontrado) {
          throw new Error("Producto no encontrado");
        }
        setProducto(productoEncontrado);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setError(error.message);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <h2>Cargando producto...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className={styles.contenedor}>
      <img
        className={styles.imagen}
        src={producto.imagen}
        alt={producto.nombre}
      />

      <div className={styles.info}>
        <h2 className={styles.titulo}>{producto.nombre}</h2>

        <h3 className={styles.precio}>Precio: ${producto.precio}</h3>

        <h3 className={styles.stock}>Stock disponible: {producto.stock}</h3>

        <h3 className={styles.detalle}>{producto.detalle}</h3>

        <button className={styles.boton}>🛒 Agregar al carrito</button>

        <button className={styles.botonVolver} onClick={() => navigate(-1)}>
          ⬅ Volver
        </button>
        
      </div>
    </section>
  );
};

export default ItemDetalle;
