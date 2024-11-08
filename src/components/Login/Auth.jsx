import React, { useState } from 'react';
import { auth, db } from '../../firebase'; // Importa la configuración de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'; // Importa Firestore
import { Contenedor } from "./stylesLogin";
import XIcon from '@mui/icons-material/X';

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const provider = new GoogleAuthProvider();

  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("username", user.displayName);

      // Verifica si el usuario ya tiene datos en Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Si el usuario no existe en Firestore, lo guarda
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
        });
      }

      setUser(user.displayName || user.email); // Guarda el nombre de usuario o el email en el estado principal
    } catch (error) {
      setErrorMessage("Error al iniciar sesión con Google. Por favor, intenta de nuevo.");
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const checkUsernameExists = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Si no está vacío, significa que el nombre de usuario ya existe
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reinicia el mensaje de error al enviar el formulario

    try {
      if (isRegistering) {
        // Verifica si el nombre de usuario ya existe
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
          setErrorMessage("El nombre de usuario ya está en uso");
          return;
        }

        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          email: email,
        });
      } else {
        
        await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(username || email); 
    } catch (error) {
      if (!isRegistering) {
        
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage("El usuario no existe");
            break;
          case 'auth/wrong-password':
            setErrorMessage("Contraseña incorrecta");
            break;
          case 'auth/invalid-email':
            setErrorMessage("Correo electrónico inválido");
            break;
          default:
            setErrorMessage("Error en el inicio de sesión, por favor intenta de nuevo");
            break;
        }
      } else {
        // Errores específicos al registrarse
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage("El usuario ya existe");
            break;
          case 'auth/invalid-email':
            setErrorMessage("Correo electrónico inválido");
            break;
          case 'auth/weak-password':
            setErrorMessage("La contraseña es muy débil");
            break;
          default:
            setErrorMessage("Error en el registro, por favor intenta de nuevo");
            break;
        }
      }
    }
  };

  return (
    <>
      <Contenedor>
        <div>
          <div className="contenedorX">
            <XIcon className='XLogo' />
          </div>
          <h2 className='h2Login'>{isRegistering ? 'Crea tu cuenta' : 'Inicia sesión en X'}</h2>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Muestra mensaje de error */}
          <div className="contenedorbtn">
            <button className='btn-Google' type="button" onClick={handleGoogleSignIn}>
              Google
            </button>
          </div>
          <h5>______________ O _____________</h5>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="contenedorbtn">
                <input className='inputNombre'
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="contenedorbtn">
              <input
                className='inputEmail'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="contenedorbtn">
              <input className='inputPassword'
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="contenedorbtn">
              <button className='btn-Login' type="submit">{isRegistering ? 'Registrar' : 'Siguiente'}</button>
            </div>
          </form>
          <div>
            <button className='btn-CreateAccount' onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </Contenedor>
    </>
  );
};

export default Auth;
