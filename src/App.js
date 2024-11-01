import React, { useState, useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { Home } from "./components/Home";
import { Sidebar } from "./components/Sidebar";
import { Widgets } from "./components/Widgets";
import Auth from "./components/Login/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ClonApp } from "./components/Login/ClonApp";

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

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
  const handleNavigate = () => {
    setShowAuth(true);
  };
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
        <>
          {showAuth ? (
            <Auth setUser={setUser} />
          ) : (
            <ClonApp onNavigate={handleNavigate} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
