{/*    import { Link } from "react-router-dom";    */}
import { useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";


function Navbar() {

  return (

         <nav className={styles.menu}>
              <ul>
                    <li><Link to="/">Inicio</Link></li>

                    <li><Link to="/productos">Productos</Link></li>

                    <li><Link to="/nuevos-productos">Nuevos Productos</Link></li>

                    <li><Link to="/contactos">Contacto</Link></li>
                    
                    <li><Link to="/carrito">Carrito</Link></li>
              </ul>
      </nav>

    );

}

export default Navbar;






