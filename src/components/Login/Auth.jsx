import React, { useState } from 'react';
import { auth, db } from '../../firebase'; // Importa la configuración de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Importa Firestore

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Campo para el nombre de usuario
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // Crea el usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Guarda el nombre de usuario en Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username, // Usa el nombre de usuario ingresado
          email: email,
        });

        // Guarda el nombre de usuario en el localStorage
        localStorage.setItem('username', username);
        setUser(username); // Setea el usuario para usarlo en otros componentes
      } else {
        // Iniciar sesión con Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Obtén los datos del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          localStorage.setItem('username', userData.username); // Almacena el nombre de usuario en el localStorage
          setUser(userData.username); // Setea el usuario para usarlo en otros componentes
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Registro' : 'Inicio de sesión'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && ( // Solo muestra el campo de nombre de usuario al registrarse
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Registrar' : 'Iniciar sesión'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default Auth;
