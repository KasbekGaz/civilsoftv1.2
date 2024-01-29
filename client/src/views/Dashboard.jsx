import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        navigate('/')
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
    <h1 
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Civilsoft</h1>
    {isAuthenticated ? (
    <div>
        <p 
            className="text-1xl font-bold tracking-tight text-white sm:text-1xl">Bienvenido al dashboard. !! </p>
        <button 
            onClick={handleProveedores}
            className="text-center font-semibold rounded-full bg-purple-500 py-2 px-4 mb-4 mt-4 hover:bg-green-400 mx-4">
                    Control de Proveedores
        </button>
        <button 
            onClick={handleLogout}
            className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-red-700"
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
