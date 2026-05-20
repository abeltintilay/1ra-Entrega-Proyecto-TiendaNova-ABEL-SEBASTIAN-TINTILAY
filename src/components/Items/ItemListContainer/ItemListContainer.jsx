import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";

function ItemListContainer({ mensaje }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

  // CARGANDO

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  // ERROR

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>{mensaje}</h2>

      <ItemList productos={productos} />
    </section>
  );
}

export default ItemListContainer;
