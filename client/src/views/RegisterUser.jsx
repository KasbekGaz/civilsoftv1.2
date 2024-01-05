import React from 'react'
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from 'react-router-dom';


const RegisterUser = () => {

    const navigate = useNavigate();

    const handleBack = () =>{
        navigate('/');
    };

    return(
        <div>
            <h1>Bienvenido</h1>
            <button className="bg-green-400 py-2 px-4 mb-4" onClick={handleBack}>
                Regresar
            </button>
            <RegisterForm />
        </div>
    );
};
export default RegisterUser;