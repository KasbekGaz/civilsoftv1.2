import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIbackend from '../api/APIbackend';
import ListObra from '../components/ListObra';


const Dashboard = () => {
    const [isAuthenticated, setAuthenticated] = useState(true);

    useEffect(() => {
    }, []);

    const handleLogout = async () => {
        try {
        await APIbackend.logout();
        setAuthenticated(false);
        } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
        }
    };

return (
<div>
    <h1>Dashboard</h1>
    {isAuthenticated ? (
    <div>
        <p>Bienvenido al dashboard.!! </p>
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
        <button className="hover:bg-yellow-500 rounded-full bg-yellow-400 py-2 px-4 mb-4 ml-4 mr-4">
            <Link to="/login">
                Iniciar sesión
            </Link>
        </button>
        <button className="hover:bg-yellow-500 rounded-full bg-yellow-400 py-2 px-4 mb-4 ml-4 mr-4">
            <Link to="/register">
                Registrarse
            </Link>
        </button>
    </div>
    )}
</div>
);
};

export default Dashboard;
