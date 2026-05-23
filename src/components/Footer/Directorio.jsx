import { useEffect, useState } from "react";

import TarjetaContacto from "./TarjetaContacto";

import styles from "./Equipo.module.css";

function Directorio() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/nosotros.json")
      .then((res) => {
        if (!res.ok) throw new Error(" ERROR DE CARGA");
        return res.json();
      })
      .then((data) => {
        setContactos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) 
        return( 
            <p className={styles.mensaje}>
                    CARGANDO DATOS...
            </p>
        );

  if (error) 
        return (
            <p className={styles.error}>
                ERROR : {error}
            </p>
        );

  return (
    <div  className={styles.directorio}>
        <h1 className={styles.titulo}>NUESTRO EQUIPO</h1>
            <div className={styles.grid}>
                {contactos.map((contacto) => (
                <TarjetaContacto key={contacto.id} {...contacto} />
                ))}
            </div>
    </div>
  );
}

export default Directorio;