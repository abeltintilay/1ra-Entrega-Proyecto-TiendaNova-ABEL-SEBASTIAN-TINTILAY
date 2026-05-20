import styles from "./Header.module.css";

import NavBar from "../NavBar/NavBar";
import CartWidget from "../Cart/CartWidget/CartWidget";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
                <h1>TiendaNova</h1>
                <p>Proyecto Final 1ra Entrega</p>
                <span>por Abel Tintilay</span>
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