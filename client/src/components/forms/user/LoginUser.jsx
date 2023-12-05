import React, { useState } from 'react';
import { loginUser } from '../../../api/ApiManagment';
import { useNavigate } from "react-router-dom";
import Button from '../../Button'

function LoginUser(){
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await loginUser(userData);

            console.log(userData.data)
            navigate('/obras');

        }catch(error){
            console.error('Error al inicar sesion:', error);
            if(error.response){
                console.error('Error del servidor:', error.response.data);
            }else{
                console.error('Error desconocido', error.message)
            }
        }
    }




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
            {error && <p className='text-red-500'>{error}</p> }
        </div>
    </div>
    );
};

export default LoginUser;