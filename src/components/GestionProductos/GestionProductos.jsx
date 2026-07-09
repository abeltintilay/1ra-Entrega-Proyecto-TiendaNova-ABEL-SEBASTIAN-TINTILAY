// src/componentes/GestionProductos/GestionProductos.jsx
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
//import FormularioContainer from '../FormularioProducto/FormularioContainer';
import FormularioProducto from "../FormularioProducto/FormularioProducto";

// IMPORTACIONES CLAVE DE FIREBASE
import { getFirestore, query, orderBy, limit, updateDoc } from "firebase/firestore";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);

  const estadoInicialForm = {
    id: "",
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    detalle: "",
    imagen: "",
    destacado: false,
  };

  const [datosForm, setDatosForm] = useState(estadoInicialForm);

  /***********************************************/
  // 1-Creamos un nuevo estado para el archivo de imagen, separado del estado del formulario.
  const [imagenFile, setImagenFile] = useState(null);
  const inputImagenRef = useRef(null); // Referencia para el input de tipo "file"

  /***   TRABAJANDO EL ID AUTOMATICO **********/
  const obtenerSiguienteId = async () => {
    try {
      const db = getFirestore();
      const productosCollection = collection(db, "productos");

      const consulta = query(
        productosCollection,
        orderBy("id", "desc"),
        limit(1),
      );

      const respuesta = await getDocs(consulta);

      if (respuesta.empty) {
        setDatosForm((prev) => ({
          ...prev,
          id: 1,
        }));
      } else {
        const ultimoProducto = respuesta.docs[0].data();

        const siguienteId = ultimoProducto.id + 1;

        setDatosForm((prev) => ({
          ...prev,
          id: siguienteId,
        }));
      }
    } catch (error) {
      console.error("Error obteniendo el siguiente ID:", error);
    }
  };

  useEffect(() => {
    obtenerSiguienteId();
  }, []);
  /************************************************************************/

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;
    // const files = evento.target.files;

    setDatosForm({
      ...datosForm,
      [name]: type === "checkbox" ? checked : value,

      //[name]: type === "file" ? files[0] : value,
    });
  };

  // 2. Nueva función para manejar el cambio del input de tipo "file"
  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  /*****************************************************/

  const cargarProductos = async () => {
    const productosRef = collection(db, "productos"); //Ajustar "productos" al nombre de tu colección
    const resp = await getDocs(productosRef);

    setProductos(resp.docs.map((doc) => ({ 
        ...doc.data(),
        idFirestore: doc.id })));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  /**************** el DELETE  ****************/
  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );
    if (confirmacion) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      // Actualizamos el estado local para reflejar el cambio en la UI             inmediatamente.
      setProductos(productos.filter((prod) => prod.id !== id));
      alert("Producto eliminado.");
    }
  };

  /******************** EDITAR ******************************/
  const [productoAEditar, setProductoAEditar] = useState(null);
  /*********************************/
  //para PONER EN FANTASMA EL BOTON DE GUARDAR EDITAR
  const[guardando, setGuardando] = useState(false);
  //-----------------------------------------------

  const manejarEditar = (producto) => {
    setProductoAEditar(producto);
    setDatosForm(producto); // Cargamos los datos del producto en el formulario
  };

  const modoEdicion = productoAEditar !== null;

  /*****************************************/
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    
    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile && !productoAEditar) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }
    setGuardando(true); // Indicamos que estamos en proceso de guardado
    
    // --- Lógica para subir la imagen a Imgbb ---
    const apiKey = "b1bf5dbdbb11d3efbe127e2413508edd"; // 🚨 ¡Reemplazá esto con tu clave!
    const formData = new FormData();
    formData.append("image", imagenFile);


    let urlImagen = datosForm.imagen;


    try {

        if (imagenFile){
                console.log("Subiendo imagen a Imgbb...");
                const respuestaImgbb = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                method: "POST",
                body: formData,
                },
            );

                const datosImgbb = await respuestaImgbb.json();

                if (datosImgbb.success) {
                    console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                    urlImagen = datosImgbb.data.url; // Guardamos la URL de la imagen subida
                    // Unimos la URL de la imagen con el resto de los datos del formulario;
                } else {
                throw new Error("La subida de la imagen a Imgbb falló.");
                }
        }

      
        const productoCompleto = {
          id: Number(datosForm.id),
          nombre: datosForm.nombre,
          precio: Number(datosForm.precio.replace(",", ".")), // Convertimos a número
          stock: Number(datosForm.stock), // Convertimos a número
          
          // Agregamos la URL obtenida
          imagen: urlImagen,
          
          destacado: datosForm.destacado,
          detalle: datosForm.detalle,
          categoria: datosForm.categoria,
        };

        // Por el momento hacemos un console.log
        console.log("Enviando producto a Firebase:", productoCompleto);
        // CODIGO PARA GUARDAR EN FIREBASE

        // Obtenemos la instancia de la base de datos
        //const db = getFirestore();
        // Apuntamos a la colección "productos" (si no existe, se crea)
        const productosCollection = collection(db, "productos");

        // Agregamos el nuevo documento a la colección
        
        if(productoAEditar){
            const docRef = doc(
              db,
              "productos",
              productoAEditar.idFirestore
            );
            await updateDoc(docRef, productoCompleto);
            alert("Producto actualizado con éxito en la base de datos de FIREBASE!");
            setProductoAEditar(null); // Limpiamos el estado de edición
            await cargarProductos(); // Actualizamos la lista de productos después de editar uno

        } else {
            await addDoc(productosCollection, productoCompleto);
            await cargarProductos(); // Actualizamos la lista de productos después de agregar uno nuevo

            alert("Producto agregado con éxito a la base de datos de FIREBASE!");
        }
 
        setDatosForm(estadoInicialForm); // Limpiamos el formulario
        
        setImagenFile(null); // Limpiamos el estado de la imagen
        
        if (inputImagenRef.current) {
          inputImagenRef.current.value = ""; // Limpiamos el input de tipo "file"
        }

        await obtenerSiguienteId();

        
      
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al subir la imagen. Por favor, intentá denuevo.");
    } finally {
      setGuardando(false); // Indicamos que hemos terminado el proceso de guardado
    }
  };


/*******************************************************/
// CANCELAR EDICION
const cancelarEdicion = async () => {
  setProductoAEditar(null);

  setDatosForm(estadoInicialForm);

  setImagenFile(null);

  if (inputImagenRef.current) {
    inputImagenRef.current.value = "";
  }

  await obtenerSiguienteId();
};
/*******************************************************/


  return (
    <div>
      <h2>Gestión de Productos</h2>
      <hr />
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarCambioImagen={manejarCambioImagen}
        manejarEnvio={manejarEnvio}
        modoEdicion={modoEdicion}
        guardando={guardando}
        inputImagenRef={inputImagenRef}
        cancelarEdicion={cancelarEdicion}
      />
      <hr />
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((prod) => (
          <li key={prod.id}>
            {prod.nombre} - ${prod.precio}
            {/*acá agregaremos los botones de acción */}
            
            <button onClick={() => manejarEditar(prod)}>Editar</button>

            <button onClick={() => handleDelete(prod.idFirestore)} style={{ marginLeft: "10px" }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GestionProductos;
