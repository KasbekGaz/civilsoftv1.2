import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const navigate = useNavigate();

  const handleLogout = async () =>{

    try {
      // Conectamos al backend y utilizamos el método DELETE
      const response = await axios.delete('http://127.0.0.1:8000/app/api/v1/logout/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      console.log('Sesión cerrada con éxito: ', response.data);
      localStorage.removeItem('token');
      navigate('/login'); // Redirigir a la página de inicio de sesión

    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

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
};

export default Navbar;