import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
return (
    <div>
        <h1>Bienvenido a la aplicación</h1>
        <p>¡Comienza tu viaje aquí!</p>
        <Link to="/login">Iniciar sesión</Link>
    </div>
);
};

export default Home;
