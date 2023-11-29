import React, { useState } from 'react';
import { loginUser } from '../../../api/ApiManagment';
import { setSession } from '../../../helper/sessionAccount'
//import { useNavigate } from "react-router-dom";
import Button from '../../Button'


export function LoginView() {

    //const navigate = useNavigate();

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
    };

    const handleLogin = async () => {
        try {
            const response = await loginUser(userData);

            console.log('Inicio de sesión exitoso. Token almacenado:', response.data.token);
            //*Almacenar token en la cookie
            setSession('loggedToken', response.data.token, 8); //hora que dura el token
            //*Marcar usuario como autenticado
            setSession('isLoggedIn', true, 8)
            // *Almacenamos información adicional del usuario en cookies si está disponible en la respuesta
            if (response.data.user) {
                setSession('user', response.data.username, 1);
                setSession('rol', response.data.rol, 1);
            }

            //navigate('/obras');

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Nombre de usuario o contraseña incorrectos');
        }
    
    };



    return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 shadow-2xl rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Inicio de Sesion</h2>
            <form>
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
                    <input type="password" name="password" value={userData.password} onChange={handleLogin} className="w-full border rounded-md py-2 px-3 mt-1 bg-sky-950"/>
                </label>
                <br />
                    <Button color="gold" text="Entrar" type="submit" />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                <br />
            </form>
        </div>
    </div>
    );
}

