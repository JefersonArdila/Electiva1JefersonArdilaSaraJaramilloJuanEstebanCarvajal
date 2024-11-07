import React, { useState, useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { Home } from "./components/Home";
import { Sidebar } from "./components/Sidebar";
import { Widgets } from "./components/Widgets";
import Auth from "./components/Login/Auth"; // Ajusta la ruta aquí
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('for-you'); // Para manejar las pestañas seleccionadas
  const [showFollowingUsers, setShowFollowingUsers] = useState(false); // Estado para mostrar los usuarios seguidos
  const [showFollowersUsers, setShowFollowersUsers] = useState(false); // Estado para mostrar los seguidores

  // Monitoreo de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Función para manejar cuando se hace clic en "Following" desde el Sidebar
  const handleFollowingClick = () => {
    setShowFollowingUsers(true); // Activamos la vista de seguidos
    setShowFollowersUsers(false); // Aseguramos que no se muestren los seguidores
    setSelectedTab('for-you'); // Reseteamos el tab a 'for-you' para evitar conflictos
  };

  // Función para manejar cuando se hace clic en "Followers" desde el Sidebar
  const handleFollowersClick = () => {
    setShowFollowersUsers(true); // Activamos la vista de seguidores
    setShowFollowingUsers(false); // Aseguramos que no se muestren los seguidos
    setSelectedTab('for-you'); // Reseteamos el tab a 'for-you' para evitar conflictos
  };

  // Función para manejar el cambio de pestaña desde el Home
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setShowFollowingUsers(false); // Desactivamos la vista de seguidos cuando se cambian las pestañas
    setShowFollowersUsers(false); // Desactivamos la vista de seguidores
  };

  return (
    <div className="App">
      <GlobalStyles />
      {user ? (
        <>
          <Sidebar onFollowingClick={handleFollowingClick} onFollowersClick={handleFollowersClick} />
          <Home
            selectedTab={selectedTab}
            setSelectedTab={handleTabChange}
            showFollowingUsers={showFollowingUsers}
            showFollowersUsers={showFollowersUsers}
            username={user}
          />
          <Widgets />
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
}

export default App;
