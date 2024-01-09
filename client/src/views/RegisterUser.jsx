import React from 'react'
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from 'react-router-dom';


const RegisterUser = () => {

    const navigate = useNavigate();

    const handleBack = () =>{
        navigate('/');
    };

    return(
        <div className=" container mx-10 my-6 max-w-sm p-6 bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Bienvenido</h1>
            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
                Regresar
            </button>
            <RegisterForm />
        </div>
    );
};
export default RegisterUser;