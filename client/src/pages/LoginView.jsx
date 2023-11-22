import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'


export function LoginView() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
            username: '',
            password: '',
        });
    
        const handleChange = (e) => {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            })
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // ! Realizar la solicitud de registro al backend
            const response = await axios.post('http://127.0.0.1:8000/app/api/v1/login/', userData);
            console.log('Inicio de sesión exitoso. Token almacenado:', response.data.token);

            // Almacenar el token en el localStorage
            localStorage.setItem('token', response.data.token);

            navigate('/obras');

          } catch (error) {
            console.error('Error al iniciar sesion:', error);
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
                    <input type="password" name="password" value={userData.password} onChange={handleChange} className="w-full border rounded-md py-2 px-3 mt-1 bg-sky-950"/>
                </label>
                <br />
                    <Button color="gold" text="Entrar" type="submit" />
                <br />
            </form>
        </div>
    </div>
    );
}

