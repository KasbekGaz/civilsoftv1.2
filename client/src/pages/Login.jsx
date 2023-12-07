import React, { useState } from 'react';
import { loginUser } from '../api/ApiManagment';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'

function Login() {
    const navigate = useNavigate();

    // Formulario
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

   

    //Cambios en los campos del formulario
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llama a la función de inicio de sesión del backend
            const response = await loginUser(userData);
            console.log('Usuario inició sesión con éxito:', response);
    
          //cerrar sesion
            navigate('/logout');
    
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            // Actualiza el estado de error para mostrar un mensaje al usuario
            setError('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };


return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 shadow-2xl rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Inicio de Sesion</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2" >
                    Nombre de Usuario:
                    <input type="text" name="username" 
                    value={userData.username} 
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 mt-1 bg-sky-950"/>
                </label>
                <br />
                <label className="block mb-2" >
                    Contraseña:
                    <input 
                    type="password" 
                    name="password" 
                    value={userData.password} 
                    onChange={handleChange} 
                    className="w-full border rounded-md py-2 px-3 mt-1 bg-sky-950"/>
                </label>
                <br />
                    <Button color="gold" text="Entrar" type="submit" />
                <br />
            </form>
        </div>
    </div>
);
}

export default Login;