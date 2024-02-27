import React from 'react'
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from 'react-router-dom';


const RegisterUser = () => {

    const navigate = useNavigate();

    const handleBack = () =>{
        navigate('/');
    };

    return(
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto my-6 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Bienvenido</h1>
            <button className="block w-full text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 my-4"onClick={handleBack}>
                Regresar
            </button>
            <RegisterForm />
        </div>
    </div>
    );
};
export default RegisterUser;