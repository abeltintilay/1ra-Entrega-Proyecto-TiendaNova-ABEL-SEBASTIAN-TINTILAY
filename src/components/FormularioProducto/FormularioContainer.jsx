// En src/contenedores/FormularioContainer/FormularioContainer.jsx
import { useState, useEffect, useRef } from "react";
import FormularioProducto from "../FormularioProducto/FormularioProducto";

// IMPORTACIONES CLAVE DE FIREBASE
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    id: "",
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    detalle: "",
    destacado: false,
    //  Imagen: null,  Eliminamos el campo de imagen del estado inicial, ya que no es necesario para el formulario.
  });
    //  Imagen: null,  Eliminamos el campo de imagen del estado inicial, ya que no es necesario para el formulario.

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
        limit(1)
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

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    // Validamos que el usuario haya seleccionado una imagen
    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }
    // --- Lógica para subir la imagen a Imgbb ---
    const apiKey = "b1bf5dbdbb11d3efbe127e2413508edd"; // 🚨 ¡Reemplazá esto con tu clave!
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await

      fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const datosImgbb = await respuestaImgbb.json();
     
      if (datosImgbb.success) {
        console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
        // Unimos la URL de la imagen con el resto de los datos del formulario;
       
       
        const productoCompleto = {
          id: Number(datosForm.id),
          nombre: datosForm.nombre,
          precio: Number(datosForm.precio.replace(",", ".")), // Convertimos a número
          stock: Number(datosForm.stock),   // Convertimos a número
          // Agregamos la URL obtenida
          imagen: datosImgbb.data.url,
          destacado: datosForm.destacado,
          detalle: datosForm.detalle,
          categoria: datosForm.categoria,
        };


        // Por el momento hacemos un console.log
        console.log('Enviando producto a Firebase:', productoCompleto);
          // CODIGO PARA GUARDAR EN FIREBASE 

              // Obtenemos la instancia de la base de datos
              const db = getFirestore();
              // Apuntamos a la colección "productos" (si no existe, se crea)
              const productosCollection = collection(db, "productos");
              
              
              // Agregamos el nuevo documento a la colección
              await addDoc(productosCollection, productoCompleto);

              alert("Producto agregado con éxito a la base de datos de FIREBASE!");


              setDatosForm({
                id: "",
                nombre: "",
                precio: "",   
                stock: "",   
                categoria: "",
                detalle: "",
                destacado: false,
              });

              setImagenFile(null); // Limpiamos el estado de la imagen
                  if (inputImagenRef.current) {
                    inputImagenRef.current.value = ""; // Limpiamos el input de tipo "file"
                  }
              
              await obtenerSiguienteId();

      } else {

        throw new Error("La subida de la imagen a Imgbb falló.");

      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert("Hubo un error al subir la imagen. Por favor, intentá denuevo.");
    }
  };
  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      // Pasamos la nueva función como prop
      manejarCambioImagen={manejarCambioImagen}
      inputImagenRef={inputImagenRef}
    />
  );
}
export default FormularioContainer;
