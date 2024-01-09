import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import APIbackend from '../api/APIbackend';

const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await APIbackend.login(data.username, data.password);
            
            console.log(response.data);

            navigate('/dashboard');
        } catch (error) {
            
            console.error('Error al iniciar sesión:', error.message);
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
            type="text" {...register('username', { required: true })} />
        <label 
            className="block my-2 font-medium">
        Contraseña:
        </label>
        <input 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password" {...register('password', { required: true })} />

        <button 
            className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-yellow-700"
            type="submit">
            Iniciar sesión
        </button>
    </form>
);
};

export default LoginForm;
