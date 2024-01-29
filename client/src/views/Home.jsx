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
    <div className="rounded-3xl bg-gradient-to-r from-violet-800 via-fuchsia-800 to-pink-900 drop-shadow-xl mx-auto my-auto max-w-7xl py-24 sm:py-32 lg:px-0">
        <h1 
            className=" mx-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Bienvenido a CivilSoft</h1>
        <p 
            className=" mb-6 text-1xl font-bold tracking-tight text-white sm:text-1xl">
                ¡Comienza tu viaje aquí! Inicia sesion o Registrate.</p>
        <div className="my-4 mt-8">
            <button 
                className=" text-center font-semibold hover:bg-yellow-600 rounded-full bg-yellow-500 py-2 px-4 mb-4 ml-4 mr-4"
                onClick={handleLogin}
                    >
                Iniciar Sesión
            </button>
            <button 
                className="text-center font-semibold hover:bg-yellow-600 rounded-full bg-yellow-500 py-2 px-4 mb-4 ml-4 mr-4"
                onClick={handleRegister}
                >
                Registrarse
            </button>
        </div>
    </div>
);
};

export default Home;
