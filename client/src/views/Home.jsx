import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    };

    const handleRegister = () => {
        navigate('/register')
    };




return (
    <div>
        <h1>Bienvenido a la aplicación</h1>
        <p>¡Comienza tu viaje aquí! Inicia sesion o Registrate.</p>
        <button 
            className="hover:bg-yellow-600 rounded-full bg-yellow-400 py-2 px-4 mb-4 ml-4 mr-4"
            onClick={handleLogin}
                >
            Iniciar Sesión
        </button>
        <button 
            className="hover:bg-yellow-600 rounded-full bg-yellow-400 py-2 px-4 mb-4 ml-4 mr-4"
            onClick={handleRegister}
            >
            Registrarse
        </button>
    </div>
);
};

export default Home;
