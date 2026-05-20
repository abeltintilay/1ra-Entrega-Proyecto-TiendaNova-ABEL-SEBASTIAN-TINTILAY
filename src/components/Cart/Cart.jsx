import styles from "./Cart.module.css";

function Cart() {

  return (

    <section className={styles.cart}>

      <h2 className={styles.titulo}>
        🛒 Tu carrito
      </h2>

      {/* LISTA DE PRODUCTOS */}

      <div className={styles.listaProductos}>

        {/* PRODUCTO 1 */}

        <div className={styles.producto}>

          <img
            src="/images/imgProductos/1-notebook.jpg"
            alt="Notebook Gamer"
            className={styles.imagen}
          />

          <div className={styles.info}>

            <h3>Notebook Gamer</h3>

            <p>Precio: $2500</p>

          </div>

          <button className={styles.eliminar}>
            ✖
          </button>

        </div>

        {/* PRODUCTO 2 */}

        <div className={styles.producto}>

          <img
            src="/images/imgProductos/2-mouse-rgb.webp"
            alt="Mouse RGB"
            className={styles.imagen}
          />

          <div className={styles.info}>

            <h3>Mouse RGB</h3>

            <p>Precio: $120</p>

          </div>

          <button className={styles.eliminar}>
            ✖
          </button>

        </div>

      </div>

      {/* RESUMEN */}

      <div className={styles.resumen}>

        <h3>Total: $2620</h3>

        <button className={styles.finalizar}>
          Finalizar compra
        </button>

      </div>

    </section>

  );
}

export default Cart;