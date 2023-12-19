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
        <p>Bienvenido al dashboard. Aquí puedes agregar contenido relevante.</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <div className="dashboard-section">
        <ListObra />
        </div>
    </div>
    ) : (
    <div>
        <p>No has iniciado sesión. Debes iniciar sesión para acceder al dashboard.</p>
        <button><Link to="/login">Iniciar sesión</Link></button>
    </div>
    )}
</div>
);
};

export default Dashboard;
