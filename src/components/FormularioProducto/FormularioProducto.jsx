// En src/componentens/FormularioProducto/FormularioProducto
import React from 'react';
import styles from './FormularioProducto.module.css';

// Por ahora, es un componente súper simple. Solo muestra el HTML.

function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen
}) {
  console.log(datosForm);
  
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio}>
      <h3>Agregar NUEVO Producto</h3>

      <div className={styles.grupoInput}>
        <label htmlFor="nombre">Nombre del Producto:</label>

        <input
              className={styles.input}
              id="nombre"
              type="text"
              placeholder="Ej: Teclado Mecánico"
              name="nombre"
              value={datosForm.nombre}
              onChange={manejarCambio}
              required
              />
      </div>

      <div className={styles.grupoInput}>
        <label htmlFor="precio">Precio:</label>
        <input
              className={styles.input}
              id="precio"
              type="number"
              placeholder="Ej: 95"
              name="precio"
              value={datosForm.precio}
              onChange={manejarCambio}
              required
              min="1"
        />
                    
      </div>

      <div className={styles.grupoInput}>
        <label htmlFor="stock">Stock:</label>
        <input
            className={styles.input}
            id="stock"
            type="number"
            placeholder="Ej: 5"
            name="stock"
            value={datosForm.stock}
            onChange={manejarCambio}
            required
            min="0"
        />
      </div>

      <div className={styles.grupoInput}>
        <label htmlFor="imagen">Imagen:</label>
        <input 
                className={styles.input}

                id="imagen"
                type="file"
                placeholder="https://..."
                onChange={manejarCambioImagen}
        />
      </div>

      <button className={styles.boton} type="submit">
              Guardar el Producto
      </button>
    </form>
  );
}
export default FormularioProducto;    