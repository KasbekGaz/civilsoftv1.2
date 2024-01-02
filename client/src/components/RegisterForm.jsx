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
            <h1>
                Registrarse en el Sistema.
            </h1>

            <form className="flex flex-col justify-center items-center">
                <label className="mb-4">
                    Nombre de Usuario:
                    <input 
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Contraseña:
                    <input 
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Correo Electronico:
                    <input 
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Número de Telefono:
                    <input 
                        type="number"
                        name="telefono"
                        value={userData.telefono}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Seleciona el Rol:
                    <select 
                        name="rol"
                        value={userData.rol}
                        onChange={handleInputChange}>
                        <option value="Admin">Administrador</option>
                        <option value="Consul">Consultor</option>
                    </select>
                </label>

                <button 
                    className="bg-green-400"
                    type="button"
                    onClick={handleCreateUser}>
                    Registrarse
                </button>

            </form>

        </div>
);    
};

export default RegisterForm;