import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import APIbackend from '../api/APIbackend';
import ListObra from '../components/ListObra';


const Dashboard = () => {
    const [isAuthenticated, setAuthenticated] = useState(true);

    useEffect(() => {
    }, []);

    const handleProveedores = () =>{
        navigate('/control-proveedores');
    };

    const handleLogout = async () => {
        try {
        await APIbackend.logout();
        setAuthenticated(false);
        } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        }
    };

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    };

    const handleRegister = () => {
        navigate('/register')
    };


return (
<div>
    <h1>Civilsoft</h1>
    {isAuthenticated ? (
    <div>
        <p>Bienvenido.!! </p>
        <button 
            onClick={handleProveedores}
            className='hover:bg-green-500 rounded-full bg-purple-700 py-2 px-4 mb-4 ml-4 mr-4'>
                    Control de Proveedores
        </button>
        <button 
            onClick={handleLogout}
            className="hover:bg-red-500 rounded-full bg-yellow-400 py-2 px-4 mb-4 ml-4 mr-4"
            >Cerrar sesión</button>
        <div className="dashboard-section">
        <ListObra />
        </div>
    </div>
    ) : (
    <div>
        <p>No has iniciado sesión. Debes iniciar sesión para acceder o registrate si es el caso.</p>
        <button 
            className="hover:bg-yellow-600 rounded-full bg-yellow-400 py-2 px-4 mb-4 ml-4 mr-4"
            onClick={handleLogin}
                >
            Iniciar Sesión
        </button>
        <button 
            className="hover:bg-yellow-600 rounded-full bg-yellow-400 py-2 px-4 mb-4 ml-4 mr-4"
            onClick={handleRegister}
            >
            Registrarse
        </button>
    </div>
    )}
</div>
);
};

export default Dashboard;
