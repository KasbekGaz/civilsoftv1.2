import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
return (
    <div>
        <h1>Bienvenido a la aplicación</h1>
        <p>¡Comienza tu viaje aquí! Inicia sesion o Registrate.</p>
        <button className="rounded-full bg-yellow-400 py-2 px-4 mb-4">
            <Link to="/login">
                Iniciar sesión
            </Link>
        </button>
        
    </div>
);
};

export default Home;
