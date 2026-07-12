// src/componentes/Login/Login.jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                alert("¡Inicio de sesión exitoso!");
                navigate('/'); //
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                alert("Error: " + errorMessage);
            });
    };
    return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>

        <h2 className={styles.titulo}>
          Iniciar Sesión
        </h2>

        <p className={styles.subtitulo}>
          Accede al panel administrativo de TiendaNova
        </p>

        <form
          className={styles.formulario}
          onSubmit={handleLogin}
        >

          <div className={styles.grupoInput}>
            <label>Correo electrónico</label>

            <input
              className={styles.input}
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.grupoInput}>
            <label>Contraseña</label>

            <input
              className={styles.input}
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.boton}
          >
            Ingresar
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;