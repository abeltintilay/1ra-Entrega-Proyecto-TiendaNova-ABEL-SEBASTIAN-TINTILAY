import ItemListContainer from "./components/Items/ItemListContainer/ItemListContainer";
import Layout from "./components/Layout/Layout";

import { Routes, Route } from "react-router-dom";

import FormularioContainer from "./components/FormularioProducto/FormularioContainer";

import Cart from "./components/Cart/Cart";

/*   directorio  */
import Directorio from "./components/Footer/Directorio";

function App() {
  return (
    <Routes>
      {/* RUTA PADRE */}

      <Route path="/" element={<Layout />}>
        {/* INICIO */}

        <Route
              index
              element={
                  <ItemListContainer
                  mensaje={
                    "Bienvenidos a TiendaNova, tu destino de tecnología de confianza!"
                  }
                />
              }
        />

        {/* PRODUCTOS */}

        <Route
          path="productos"
          element={
            <>
                  <h1>Hola</h1>
                  <ItemListContainer
                    mensaje={"¡Descubre nuestros nuevos productos!"}
                  />
            </>
          }
        />

        {/* NUEVOS PRODUCTOS */}

        <Route path="nuevos-productos" element={<FormularioContainer />} />

        {/* CONTACTOS */}

        <Route
          path="contactos"
          element={
            <>
              <h2>Nuestra empresa cuenta con personal altamente capacitado</h2>
              <p>
                Este es el equipo que trabaja para ofrecer el mejor servicio.
              </p>
              <Directorio />
            </>
          }
        />

        {/* CARRITO */}

        <Route
          path="/carrito"
          element={
            <>
              <h2>Estado actual del carrito: </h2>
              <p>Productos</p>
              <Cart />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;