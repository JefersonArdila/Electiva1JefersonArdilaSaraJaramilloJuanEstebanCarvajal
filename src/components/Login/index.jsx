
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/*Login con Sara, reestructurar*/

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const userData = JSON.parse(localStorage.getItem('users')) || [];
        const user = userData.find(user => user.email === email && user.password === password);

        if (user) {
            onLogin(user);
            console.log('Inicio de sesión exitoso');
        } else {
            console.log('Usuario no encontrado o contraseña incorrecta');
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>
                ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
    );
};

export default Login;
