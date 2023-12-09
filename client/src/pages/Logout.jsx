import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/ApiManagment';

function Logout() {
    const navigate = useNavigate();

    // Boton de logout click
    const handleLogout = async () => {
        try {
            await logoutUser();
            console.log('Usuario cerró sesión con éxito.');
            navigate('/login'); // Redirigir al login
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
            // Podrías agregar una lógica adicional aquí para mostrar un mensaje de error al usuario si lo deseas
        }
    };

    return (
        <div className="sidebar">
            <nav className="bg-blue-900 p-4 flex flex-col h-full">
                <div className="mb-4">
                    <a href="" className="text-white">
                        <span>Notificaciones</span>
                    </a>
                    <div className="ml-4">
                        <h6 className="text-sm text-gray-200">Mensajes de tareas vencidas</h6>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <a href="" className="text-white">
                        <span>Usuario Autenticado</span>
                    </a>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={handleLogout}
                        className="bg-red-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-600"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Logout;
