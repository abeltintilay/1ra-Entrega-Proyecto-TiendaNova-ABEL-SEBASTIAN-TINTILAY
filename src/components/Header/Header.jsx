import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import NavBar from "../NavBar/NavBar";
import CartWidget from "../Cart/CartWidget/CartWidget";

function Header() {
  const [mostrarHeader, setMostrarHeader] = useState(true);

  useEffect(() => {
    let ultimoScroll = window.scrollY;

    const controlarScroll = () => {
      const scrollActual = window.scrollY;

      // Siempre mostrar cuando estamos arriba
      if (scrollActual <= 80) {
        setMostrarHeader(true);
      }
      // Ocultar al bajar
      else if (scrollActual > ultimoScroll) {
        setMostrarHeader(false);
      }
      // Mostrar al subir
      else {
        setMostrarHeader(true);
      }

      ultimoScroll = scrollActual;
    };

    window.addEventListener("scroll", controlarScroll);

    return () => {
      window.removeEventListener("scroll", controlarScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${
        !mostrarHeader ? styles.headerOculto : ""
      }`}
    >
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <h1>TiendaNova</h1>

          <div className={styles.signature}>
            <p>Proyecto Final 2da Entrega</p>
            <span>por Abel Tintilay</span>
          </div>
        </Link>
      </div>

      <div className={styles.navContainer}>
        <NavBar />
      </div>

      <div className={styles.cartContainer}>
        <CartWidget />
      </div>
    </header>
  );
}

export default Header;