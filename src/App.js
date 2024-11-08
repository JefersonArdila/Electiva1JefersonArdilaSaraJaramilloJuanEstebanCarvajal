import React, { useState, useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { Home } from "./components/Home";
import { Sidebar } from "./components/Sidebar";
import { Widgets } from "./components/Widgets";
import Auth from "./components/Login/Auth";
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Nuevo estado para el usuario seleccionado
  const [selectedTab, setSelectedTab] = useState('for-you');
  const [showFollowingUsers, setShowFollowingUsers] = useState(false);
  const [showFollowersUsers, setShowFollowersUsers] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
        setSelectedUser(null); // Resetear usuario seleccionado al loguearse
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleFollowingClick = () => {
    setShowFollowingUsers(true);
    setShowFollowersUsers(false);
    setSelectedTab('for-you');
  };

  const handleFollowersClick = () => {
    setShowFollowersUsers(true);
    setShowFollowingUsers(false);
    setSelectedTab('for-you');
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setShowFollowingUsers(false);
    setShowFollowersUsers(false);
    setSelectedUser(null); // Resetear al usuario logueado
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setShowFollowingUsers(false);
    setShowFollowersUsers(false);
    setSelectedTab("for-you"); // Establecer la pestaña en "for-you"
  };

  const handleLogoClick = () => {
    setSelectedUser(null); // Resetear al usuario logueado
    setSelectedTab("for-you");
  };

  return (
    <div className="App">
      <GlobalStyles />
      {user ? (
        <>
          <Sidebar
            onFollowingClick={handleFollowingClick}
            onFollowersClick={handleFollowersClick}
            selectedUser={selectedUser}
            onLogoClick={handleLogoClick}
          />
          <Home
            selectedTab={selectedTab}
            setSelectedTab={handleTabChange}
            showFollowingUsers={showFollowingUsers}
            showFollowersUsers={showFollowersUsers}
            username={user}
            selectedUser={selectedUser}
            onUserClick={handleUserSelection}
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
