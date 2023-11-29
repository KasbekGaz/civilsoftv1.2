import React, { useState } from 'react';
import { registerUser } from '../../../api/ApiManagment'
import { useNavigate } from 'react-router-dom'
import Button from '../../Button'




const RegisterUserView = () => {

    const navigate = useNavigate();


    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        telefono: '',
        rol: 'Consul',
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await registerUser(userData);
    
        navigate('/login'); //! redirecciona a inicio de sesion
    
      } catch (error) {
        console.error('Error al registrar usuario:', error);
    
        if (error.response) {
          console.error('Error de servidor:', error.response.data);
        } else if (error.request) {
          console.error('Error de red: No se pudo conectar al servidor.');
        } else {
          console.error('Error desconocido:', error.message);
        }
      }
    };
    
    
    

    return (
        <div  className="min-h-screen flex items-center justify-center">
          <div className="p-8 shadow-2xl rounded-md">
            <h2 className="text-2xl font-semibold mb-4" >Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Nombre de Usuario:
                <input 
                type="text" 
                name="username" 
                value={userData.username} 
                onChange={handleChange} 
                className="bg-sky-950 w-full border rounded-md py-2 px-3 mt-1"
                />
              </label>
              <br />
              <label className="block mb-2">
                Contraseña:
                <input type="password" name="password" value={userData.password} onChange={handleChange} className="bg-sky-950 w-full border rounded-md py-2 px-3 mt-1" />
              </label>
              <br />
              <label className="block mb-2">
                Email:
                <input type="email" name="email" value={userData.email} onChange={handleChange} className="bg-sky-950 w-full border rounded-md py-2 px-3 mt-1" />
              </label>
              <br />
              <label className="block mb-2">
                Teléfono:
                <input type="text" name="telefono" value={userData.telefono} onChange={handleChange} className="bg-sky-950 w-full border rounded-md py-2 px-3 mt-1"/>
              </label>
              <br />
              <label className="block mb-2">
                Rol:
                <select 
                name="rol" 
                value={userData.rol} 
                onChange={handleChange} 
                className="bg-sky-950 w-full border rounded-md py-2 px-3 mt-1">
                  <option value="Admin">Administrador</option>
                  <option value="Consul">Consultor</option>
                </select>
              </label>
              <br />
              <Button type="submit" color="gold" text="Registrar" />
            </form>
          </div>
        </div>
      );




};

export default RegisterUserView;