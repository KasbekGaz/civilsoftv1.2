import React from 'react'
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../api/ApiManagment';

function Logout() {
    const navigate = useNavigate();

    //boton de logout click
    const handleLogout = async () =>{
        try{
            
            await logoutUser();
            console.log('Usuario cerró sesión con éxito.',);

            navigate('/login'); //redirigir al login

        }catch(error){
            console.error('Error al cerrar sesión:', error.message);
        }
    }

return (
    <nav className='bg-blue-900 p-4'>
        <div className='flex items-center justify-between text-white'>
        <div>
            <a href="" className='felx items-center'></a>
            <i className='mr-2'></i>
            <span>Notificaciones</span>
            <div className='ml-4'>
            <h6 className='text-sm text-gray-200'>Mensajes de tareas vencidas</h6>
            </div>
        </div>
        <div className='felx items-center'>
            <a href="" className='text-white'>
            <span>
                Usuario Autenticado
            </span>
            </a>
            <div className='ml-4'>
            <button 
                onClick={handleLogout}
                className='bg-red-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-600'
            >Cerrar Sesion</button>
            </div>
        </div>
        </div>
    </nav>
    );
}

export default Logout;