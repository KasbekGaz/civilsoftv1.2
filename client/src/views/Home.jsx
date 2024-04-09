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
<div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-pink-800 drop-shadow-xl mx-auto my-auto max-w-6xl py-8 sm:py-12 lg:px-8 xl:px-16 border border-black">
    <h1 className="mx-4 text-3xl lg:text-4xl font-bold tracking-tight text-white sm:text-4xl">Bienvenido a CivilSoft</h1>
    <p className="text-base lg:text-lg font-bold tracking-tight text-white sm:text-lg">¡Comienza tu viaje aquí!</p>
    <p className="text-base lg:text-lg font-bold tracking-tight text-white sm:text-lg">Inicia sesión o Regístrate.</p>
    <div className="my-4">
        <img src="/CivilSoft-Home.svg" alt="Icon" className="w-20 h-auto mx-auto"/> {/* Reducido el tamaño del icono */}
    </div>

    <div className="my-2">
        <button 
            className="text-center font-semibold hover:bg-yellow-600 rounded-full bg-yellow-500 py-2 px-4 mb-2 ml-2 mr-2"
            onClick={handleLogin}
        >
            Iniciar Sesión
        </button>
        <button 
            className="text-center font-semibold hover:bg-yellow-600 rounded-full bg-yellow-500 py-2 px-4 mb-2 ml-2 mr-2"
            onClick={handleRegister}
        >
            Registrarse
        </button>
    </div>
</div>



);
};

export default Home;
