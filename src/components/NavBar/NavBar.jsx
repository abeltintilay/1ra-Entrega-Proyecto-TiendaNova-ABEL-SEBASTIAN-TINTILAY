import { useState } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";


function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const { user, logout } = useAuth();  // Accedemos al usuario y a la función de logout desde el contexto

  //--- Al cerrar sesion, redireccionar a la pagina de inicio
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await logout();
      alert("Sesión cerrada correctamente.");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* INSERTAMOS EL BOTON HAMBURGUESA */}
      <button
        className={styles.hamburguesa}
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? "×" : "☰"}
      </button>

      <ul
        className={
          menuAbierto ? `${styles.menu} ${styles.activo}` : styles.menu
        }
      >
        <li>
          <Link to="/" onClick={cerrarMenu}>
            Inicio
          </Link>
        </li>

        <li>
          <Link to="/productos" onClick={cerrarMenu}>
            Productos Destacados
          </Link>
        </li>

        {/*-----------------------aqui estaban los link de getion productos y gestion cupones -------------------------------*/}

        {/*------------------------------------------------------*/}
        {/*  <li><Link to="/nuevos-productos" onClick={cerrarMenu}>Nuevos Productos</Link></li>   */}

        <li>
          <Link to="/contactos" onClick={cerrarMenu}>
            Contacto
          </Link>
        </li>

        <li>
          <Link to="/carrito" onClick={cerrarMenu}>
            Carrito
          </Link>
        </li>

        {/*** -------------  LOGIN ---------------***/}

        {user ? (
          <>
                  {/* Mostrar Gestion SOLO si el usuario es admin */}
                  {user.rol === "admin" && (
                    <>
                        <li>
                            <Link to="/gestion" onClick={cerrarMenu}>
                                Gestion Productos
                            </Link>
                        </li>

                        <li>
                            <Link to="/gestionCupones" onClick={cerrarMenu}>
                                 Gestion Cupones
                            </Link>
                        </li>
                    </>
                  )}
                  <span style={{ color: "white" }}>¡Hola, {user.email}!</span>
                  <button onClick={cerrarSesion} style={{ color: "white" }}>
                    Cerrar Sesión
                  </button>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        {/*-----------------------------------------*/}
      </ul>
    </nav>
  );
}

export default Navbar;
