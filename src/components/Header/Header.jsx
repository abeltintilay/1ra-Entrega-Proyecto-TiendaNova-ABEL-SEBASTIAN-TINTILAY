import styles from "./Header.module.css";

import NavBar from "../NavBar/NavBar";
import CartWidget from "../Cart/CartWidget/CartWidget";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
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