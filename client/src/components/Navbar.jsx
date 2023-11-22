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
  <nav>
  <div>
    <div>
      <a href=""></a>
        <i></i>
        <span>Notificaciones</span>
      <div>
        <h6>Mensajes de tareas vencidas</h6>
      </div>
    </div>
    <div>
      <a href="">
        <span>
          Usuario Autenticado
        </span>
      </a>
      <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </div>
  </div>
  </nav>
  );
};

export default Navbar;