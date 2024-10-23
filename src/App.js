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

  return (
    <div className="App">
      <GlobalStyles />
      {user ? (
        <>
          <Sidebar />
          <Home username={user} />
          <Widgets />
        </>
      ) : (
        <Auth setUser={setUser} /> 
      )}
    </div>
  );
}

export default App;
