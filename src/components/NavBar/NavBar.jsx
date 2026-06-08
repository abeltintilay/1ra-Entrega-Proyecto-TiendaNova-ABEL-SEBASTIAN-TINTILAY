import { useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";


function Navbar() {

  const [menuAbierto, setMenuAbierto] = useState(false);

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
                className={menuAbierto?
                 `${styles.menu} ${styles.activo}`
                 : styles.menu}
                 >
                    <li><Link to="/">Inicio</Link></li>

                    <li><Link to="/productos">Productos Destacados</Link></li>

                    <li><Link to="/nuevos-productos">Nuevos Productos</Link></li>

                    <li><Link to="/contactos">Contacto</Link></li>
                    
                    <li><Link to="/carrito">Carrito</Link></li>
              </ul>
      </nav>

    );

}

export default Navbar;