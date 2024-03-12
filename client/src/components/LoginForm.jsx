import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import APIbackend from '../api/APIbackend';
import './CSS/Spinner.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true); //* Activar animacion de carga
            const response = await APIbackend.login(data.username, data.password);
            
            console.log(response.data);

            navigate('/dashboard');
        } catch (error) {
            
            console.error('Error al iniciar sesión:', error.message);
        }finally{
            setLoading(false); //*desactivar la animacion
        }
    console.log(data);
    };

return (
    <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}>
        <label className="block my-2 font-medium">
        Usuario:
        </label>
        <input 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text" {...register('username', { required: true })} required/>
        <label 
            className="block my-2 font-medium">
        Contraseña:
        </label>
        <input 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password" {...register('password', { required: true })} required/>

        
        <div className="items-center">
            <button 
                className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-yellow-700 relative"
                type="submit"
                disabled={loading}> {/* Deshabilitar el botón durante la carga */}
                Iniciar sesión
            </button>
            {loading && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 mb-4">
                        <div className="loader"></div> {/* Mostrar el spinner de carga si está cargando */}
                    </div>
                )}
        </div>
    </form>
);
};

export default LoginForm;
