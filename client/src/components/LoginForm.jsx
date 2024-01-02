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
    <form onSubmit={handleSubmit(onSubmit)}>
        <label>
        Usuario:
        <input type="text" {...register('username', { required: true })} />
        </label>
        <br />
        <label>
        Contraseña:
        <input type="password" {...register('password', { required: true })} />
        </label>
        <br />
        <button className="rounded-full bg-yellow-400 py-2 px-4 mb-4"
        type="submit">Iniciar sesión</button>
    </form>
);
};

export default LoginForm;
