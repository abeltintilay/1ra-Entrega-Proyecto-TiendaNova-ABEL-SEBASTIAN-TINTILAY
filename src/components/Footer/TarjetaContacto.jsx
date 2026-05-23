import styles from './Equipo.module.css';

function TarjetaContacto({ nombre, email, puesto, foto }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagenContainer}>
        <img className={styles.imagen}
          src={foto} 
          //className={styles.avatar} 
          alt={nombre} 
        />
      </div>

        <div className={styles.info}>
            <h3 className={styles.nombre}>{nombre}</h3>
            <p className={styles.cargo}>{puesto}</p>
            <p className={styles.email}>{email}</p>

            <button className={styles.boton}>
                    Contactar
            </button>
        </div>
      
    </div>
  );
}

export default TarjetaContacto;