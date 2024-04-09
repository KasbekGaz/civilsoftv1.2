import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import APIbackend from '../api/APIbackend';
import ListObra from '../components/ListObra';
import CalendarView from './CalendarView';
import AllTareasView from './AllTareasView';


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
    {isAuthenticated ? (
        <div>
            <div>
                <div className=" container mx-auto flex-auto bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
                <div className="my-4">
                    <img src="/CivilSoft-Home.svg" alt="Icon" className="w-20 h-auto mx-auto"/>
                </div>
                    <h1 
                    className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Civilsoft</h1>
                    <p 
                        className="text-1xl font-bold tracking-tight text-white sm:text-1xl">Bienvenido al centro de control</p>
                    <button 
                        onClick={handleProveedores}
                        className="text-center font-semibold rounded-full bg-purple-500 py-2 px-4 mb-4 mt-4 hover:bg-green-400 mx-4">
                                Control de Proveedores
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-red-700"
                        >Cerrar sesión</button>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4 bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
                        <AllTareasView/>
                    </div>
                    <div className="p-4 bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
                        <CalendarView/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="p-4 bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
                    <ListObra />
                    </div>
                </div>
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
