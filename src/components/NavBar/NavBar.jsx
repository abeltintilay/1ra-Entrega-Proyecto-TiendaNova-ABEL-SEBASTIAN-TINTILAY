import { useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";


function Navbar() {

  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {setMenuAbierto(false);};

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
                    <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>

                    <li><Link to="/productos" onClick={cerrarMenu}>Productos Destacados</Link></li>

                    <li><Link to="/nuevos-productos" onClick={cerrarMenu}>Nuevos Productos</Link></li>

                    <li><Link to="/contactos" onClick={cerrarMenu}>Contacto</Link></li>
                    
                    <li><Link to="/carrito" onClick={cerrarMenu}>Carrito</Link></li>
              </ul>
      </nav>

    );

}

export default Navbar;