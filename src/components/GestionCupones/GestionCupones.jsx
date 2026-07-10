import { useState, useEffect } from "react";
import { db } from "../../firebase/config";

import styles from "./GestionCupones.module.css";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";

const GestionCupones = () => {

    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState("");
    const [cupones, setCupones] = useState([]);

    // Cargar cupones
    const obtenerCupones = async () => {

		    try {
		
		        const respuesta = await getDocs(collection(db, "cupones"));
		
		        const lista = respuesta.docs.map((doc) => ({
		            id: doc.id,
		            ...doc.data()
		        }));
		
		        setCupones(lista);
		
		    } catch (error) {
		
		        console.error("Error al obtener los cupones:", error);
		        alert("Ocurrió un error al cargar los cupones.");
		
		    }
		
		};

    useEffect(() => {
        obtenerCupones();
    }, []);

    // Crear cupón
    const crearCupon = async (e) => {

		    e.preventDefault();
		
		    if (!codigo || !descuento) {
		        alert("Complete todos los campos");
		        return;
		    }
		    
		    const porcentaje = Number(descuento);

				if (porcentaje < 1 || porcentaje > 100) {
				    alert("El descuento debe estar entre 1 y 100.");
				    return;
				}
		
		    try {
		
		        await addDoc(collection(db, "cupones"), {
		            codigo,
		            descuento: Number(descuento),
		        });
                
                alert("Cupón creado correctamente.");

		        setCodigo("");
		        setDescuento("");
		
		        await obtenerCupones();
		
		    } catch (error) {
		        console.error(error);
		        alert("Error al crear el cupón.");
		    }
		
		};

    // Eliminar cupón
    const eliminarCupon = async (id) => {

		    try {
		
		        await deleteDoc(doc(db, "cupones", id));
                alert("Cupón eliminado correctamente.");
		        await obtenerCupones();
		
		    } catch (error) {
		        console.error(error);
		        alert("Error al eliminar el cupón.");
		    }
		
		};


return (
    <div className={styles.contenedor}>

        <h2 className={styles.tituloPrincipal}>
            Administración de Cupones
        </h2>


        <div className={styles.formularioCard}>

            <form onSubmit={crearCupon} className={styles.formulario}>

                <div className={styles.campo}>
                    <label>Código del cupón</label>

                    <input
                        type="text"
                        placeholder="Ej: DESCUENTO10"
                        required
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>


                <div className={styles.campo}>
                    <label>Porcentaje de descuento</label>

                    <input
                        type="number"
                        placeholder="Ej: 20"
                        min="1"
                        max="100"
                        required
                        value={descuento}
                        onChange={(e) => setDescuento(e.target.value)}
                    />
                </div>


                <button 
                    type="submit"
                    className={styles.botonCrear}
                >
                    Crear Cupón
                </button>


            </form>

        </div>



        <h3 className={styles.tituloPrincipal}>
            Listado de Cupones
        </h3>



        <div className={styles.lista}>

        {
            cupones.map((cupon) => (

                <div
                    key={cupon.id}
                    className={styles.cuponCard}
                >

                    <div>
                        <p>
                            <strong>Código:</strong> {cupon.codigo}
                        </p>

                        <p>
                            <strong>Descuento:</strong> {cupon.descuento}%
                        </p>
                    </div>


                    <button
                        onClick={() => eliminarCupon(cupon.id)}
                        className={styles.botonEliminar}
                    >
                        Eliminar
                    </button>


                </div>

            ))
        }

        </div>


    </div>
);

};

export default GestionCupones;
