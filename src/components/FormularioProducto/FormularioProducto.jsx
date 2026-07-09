// En src/componentens/FormularioProducto/FormularioProducto
import React from 'react';
import styles from './FormularioProducto.module.css';

// Por ahora, es un componente súper simple. Solo muestra el HTML.

function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  inputImagenRef,
  modoEdicion,
  guardando,
  cancelarEdicion
}) {
  console.log(datosForm);
  
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio}>
      <h3>
          {modoEdicion
                        ? "Editar Producto"
                        : "Agregar Nuevo Producto"}
      </h3>

      <div className={styles.grupoInput}>
        <label htmlFor="id">ID del Producto:</label>
        <input
              className={styles.input}
              id="id"
              type="number"
              name="id"
              value={datosForm.id}
              onChange={manejarCambio}
              readOnly
        />

      </div>

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
              step="0.01"
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
        <label htmlFor="categoria">Categoría:</label>
        <select
          className={styles.input}
          id="categoria"
          type="text"
          placeholder="Ej: Periféricos"
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
          required
        >
            <option value="">Seleccione una categoría</option>

                    <option value="Notebooks">Notebooks</option>

                    <option value="Monitores">Pantalla</option>

                    <option value="Periféricos">Periféricos</option>

                    <option value="Sonido">Sonido</option>
        </select>
      
      </div>

    <div className={styles.grupoInput}>
        <label htmlFor="detalle">Detalle:</label>
        <textarea
          className={styles.input}
          id="detalle"
          name="detalle"
          placeholder="Descripción del producto..."
          value={datosForm.detalle}
          onChange={manejarCambio}
          rows="5"
          required
        />
      </div>


      <div className={styles.grupoInput}>
        <label htmlFor="imagen">Imagen:</label>
        {/* Mostramos la imagen actual si estamos en modo edición y hay una imagen existente */}
              {modoEdicion && datosForm.imagen && (
                <img
                     src={datosForm.imagen}
                     alt={datosForm.nombre}
                     className={styles.imagenProducto} />
              )}

        {/*-----------------------------------------------------------*/}

        <input 
                ref={inputImagenRef}
                className={styles.input}
                id="imagen"
                type="file"
                accept="image/*"
                onChange={manejarCambioImagen}
                required={!modoEdicion} // Solo requerido si no estamos editando
        />
      </div>

      <div className={styles.grupoInput}>
        <label>
              <input
                type="checkbox"
                name="destacado"
                checked={datosForm.destacado}
                onChange={manejarCambio}
              />
            Producto Destacado
        </label>
      </div>


      <button
              className={styles.boton}
              type="submit"
              disabled={guardando}
              >{
                guardando
                      ? "Procesando..."
                      : modoEdicion
                          ? "Actualizar Producto"
                          : "Guardar Producto"
              }
      </button>
      
      {modoEdicion && (
                <button
                      type="button"
                      className={styles.botonCancelar}
                      onClick={cancelarEdicion}
                >
                    Cancelar edición
                </button>
)}

    </form>
  );
}
export default FormularioProducto;    