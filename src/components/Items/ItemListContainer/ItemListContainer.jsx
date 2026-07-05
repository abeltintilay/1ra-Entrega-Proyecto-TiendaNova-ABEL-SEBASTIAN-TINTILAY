import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";

/*  conección con firebase  */
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";


function ItemListContainer({ mensaje, destacado }) {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);


  /*
  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar productos");
        }
        return res.json();
      })

      .then((data) => {
        setProductos(data);
        setCargando(false);
      })

      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
      
  }, []);

*/

/* conectando con la base de datos de firebase */
/********************************/
useEffect(() => {
    const prodDB = collection(db, "productos");
    getDocs(prodDB)
        .then((resp) => {
        setProductos(
          resp.docs.map((doc) => {
            return { ...doc.data() };
          }),
      );
      
      setCargando(false);

    });
  }, []);
/******************************/


  // CARGANDO

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  // ERROR

  if (error) {
    return <p>Error: {error}</p>;
  }

// FILTRANDO LOS PRODUCTOS DESTACADOS

const productosAMostrar = destacado ? productos.filter((prod) => prod.destacado) : productos;

  return (
    <section className={styles.contenedor}>
      <h2 className={styles.titulo}>{mensaje}</h2>

      <ItemList productos={productosAMostrar} />
    </section>
  );
}

export default ItemListContainer;
