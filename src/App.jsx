import ItemListContainer from "./components/Items/ItemListContainer/ItemListContainer";
import Layout from "./components/Layout/Layout";

import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

//import FormularioContainer from "./components/FormularioProducto/FormularioContainer";

import Cart from "./components/Cart/Cart";

import ProductoDestacado from "./components/ProductoDestacado/ProductoDestacado";


import ItemDetalle from "./components/Items/ItemsDetalle/ItemDetalle";

// IMPOR GESTION DE PRODUCTOS
import Gestion from "./components/GestionProductos/GestionProductos";

// IMPOR GESTION DE CUPONES
import GestionCupones from "./components/GestionCupones/GestionCupones";

// IMPORTAR LOGIN
import Login from "./components/Login/Login";

/*   directorio  */
import Directorio from "./components/Footer/Directorio";

import ProductosDB from "./components/ProductosDB/ProductosDB";

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

                {/* RUTA DINAMICA PARA EL DETALLE DE CADA PRODUCTO */}

                <Route path="productos/:id" element={<ItemDetalle />} />

                {/* NUEVOS PRODUCTOS */}

             {/*   <Route path="nuevos-productos" element={<FormularioContainer />} />        */}

                {/* GESTION DE PRODUCTOS */}

                <Route path="gestion" element={<Gestion />} />

                {/* GESTION DE CUPONES */}

                <Route path="gestionCupones" element={<GestionCupones />} />

                {/* LOGIN */}

                <Route path="login" element={<Login />} />

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
                <Route path="/productosDB" element={<ProductosDB />} />
      </Route>
    </Routes>
  );
}

export default App;