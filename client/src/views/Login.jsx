import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();


    const handleBack = () =>{
        navigate('/')
    };

return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mx-auto my-6 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Bienvenido</h1>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Iniciar sesión</h2>
        <button 
            className="block w-full text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 my-4"
            onClick={handleBack}
        >
            Regresar
        </button>
        <LoginForm />
    </div>
</div>

);
};

export default Login;
