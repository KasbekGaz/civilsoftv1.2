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
<div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-pink-800 drop-shadow-xl mx-auto my-auto max-w-6xl py-24 sm:py-32 lg:px-16 xl:px-32 border border-black">
    <h1 className="mx-4 text-4xl lg:text-5xl font-bold tracking-tight text-white sm:text-5xl">Bienvenido a CivilSoft</h1>
    <p className="text-lg lg:text-xl font-bold tracking-tight text-white sm:text-xl">¡Comienza tu viaje aquí!</p>
    <p className="text-lg lg:text-xl font-bold tracking-tight text-white sm:text-xl">Inicia sesión o Regístrate.</p>
    <div className="my-8">
        <img src="/CivilSoft-Home.svg" alt="Icon" className="w-36 h-auto mx-auto"/>
    </div>

    <div className="my-4">
        <button 
            className="text-center font-semibold hover:bg-yellow-600 rounded-full bg-yellow-500 py-2 px-4 mb-4 ml-4 mr-4"
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
