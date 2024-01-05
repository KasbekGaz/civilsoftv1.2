import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();


    const handleBack = () =>{
        navigate('/')
    };

return (
    <div>
        <h1>Iniciar sesión</h1>
        <button className="bg-green-400 py-2 px-4 mb-4" onClick={handleBack}>
            Regresar
        </button>
        <LoginForm />
    </div>
);
};

export default Login;
