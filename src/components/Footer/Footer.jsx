import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
            <h2>TiendaNova</h2>
            <p>Tecnología para tu hogar</p>
            <div className={styles.team}>
                  {/*  AQUI ARMO LA PRESENTACION DE LAS TARJETAS*/}
                  <div className={styles.card}>
                      <img src="/images/imgNosotros/abel.png" alt=" desarrollador 4" />
                      <h4>Abel Tintilay</h4>
                      <span>Frontend Developer</span>
                  </div>

                  <div className={styles.card}>
                      <img src="/images/imgFooter/frontEnd1.png" alt=" desarrollador 1" />
                      <h4>Leo Messi</h4>
                      <span>UI Designer</span>
                  </div>

                  <div className={styles.card}>
                      <img src="/images/imgFooter/frontEnd2.webp" alt=" desarrollador 2" />
                      <h4>Diego Maradona</h4>
                      <span>Backend Developer</span>
                  </div>                  
            </div>
      </div>

        <div className={styles.logoContainer}>
            <img src="/images/imgTiendaNova/tiendaNov.png"
            alt="Logo de TiendaNova"
            className={styles.logo} />
            <span>En TiendaNova combinamos tecnología, programación y diseño digital para crear experiencias modernas e innovadoras.</span>
        </div>
      

      <div className={styles.copy}>
        <p>@ 2026 TiendaNova</p>
        <p>Proyecto Final 1ra Entrega</p>
        <span>Desarrollado por Abel Tintilay</span>
      </div>
    </footer>
  );
}

export default Footer;