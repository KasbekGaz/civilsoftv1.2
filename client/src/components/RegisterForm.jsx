import  React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIbackend from "../api/APIbackend";

const RegisterForm = () =>{
    const navigate = useNavigate();
    const [ userData, setUserData] = useState({
        username:'',
        password:'',
        email:'',
        telefono:'',
        rol:'',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateUser = async () =>{
        try {
            const response = await APIbackend.registerUser(userData);

            console.log('Usuario Registrado:', response);
            alert('Se registró correctamente, sera redirigido a incio de sesión.');
            navigate('/login');
        }catch(error){
            console.error('Error al registrarse. !!', error.message);
        };
    };
    return(
        <div>
            <h1 
                className="text-2xl font-bold tracking-tight text-white sm:text-2xl">
                Registrarse en el Sistema.
            </h1>
            <form className="flex flex-col justify-center items-center">
                <label className="block my-2 font-medium">
                    Nombre de Usuario:
                </label>
                    <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            />
                <label className="block my-2 font-medium">
                    Contraseña:
                </label>
                    <input  
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            />
                <label className="block my-2 font-medium">
                    Correo Electronico:
                </label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="email"
                        name="email"
                        placeholder="Ej. Correo@gmail.com"
                        value={userData.email}
                        onChange={handleInputChange}
                        />
                <label className="block my-2 font-medium">
                    Número de Telefono:
                </label>
                    <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Ej. 9601234567"
                            name="telefono"
                            value={userData.telefono}
                            onChange={handleInputChange}
                            />
                <label className="block my-2 font-medium">
                    Seleciona el Rol:
                </label>
                    <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="rol"
                            value={userData.rol}
                            onChange={handleInputChange}>
                            <option value="Admin">Administrador</option>
                            <option value="Consul">Consultor</option>
                        </select>

                <button 
                    className=" text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-yellow-700"
                    type="button"
                    onClick={handleCreateUser}>
                    Registrarse
                </button>

            </form>

        </div>
);    
};

export default RegisterForm;