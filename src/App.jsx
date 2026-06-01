import ItemListContainer from "./components/Items/ItemListContainer/ItemListContainer";
import Layout from "./components/Layout/Layout";

import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import FormularioContainer from "./components/FormularioProducto/FormularioContainer";

import Cart from "./components/Cart/Cart";

import ProductoDestacado from "./components/ProductoDestacado/ProductoDestacado";

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
                          <ProductoDestacado
                            mensaje={"¡Descubre nuestros nuevos productos DESTACADOS!"}
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
                      <section className={styles.introSection}>
                        <h2>Nuestra empresa cuenta con personal altamente capacitado</h2>
                        <p>
                          Este es el equipo que trabaja para ofrecer el mejor servicio.
                        </p>
                      </section>
                      <Directorio />
                    </>
                  }
                />

                {/* CARRITO */}

                <Route
                  path="/carrito"
                  element={
                    <>
                      <section className={styles.introSection}>
                        <h2>Estado actual del carrito: </h2>
                        <p>Productos</p>
                      </section>
                      <Cart />
                    </>
                  }
                />
      </Route>
    </Routes>
  );
}

export default App;