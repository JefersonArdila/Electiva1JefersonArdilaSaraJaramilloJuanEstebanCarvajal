// Welcome.jsx
import React from 'react';

const Welcome = ({ onNavigate }) => {
  return (
    <div>
      <h1>Bienvenido a nuestra aplicación</h1>
      <button onClick={onNavigate}>Iniciar Sesión</button>
    </div>
  );
};

export default Welcome;
