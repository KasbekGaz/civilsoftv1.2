import React, { useState } from 'react';
import { registerUser } from '../api/ApiManagment';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Register() {
const navigate = useNavigate();

  // Estado del formulario
const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    telefono: '',
    rol: 'Consul', // Valor en Consultor
});

  // Manejar cambios en los campos del formulario
const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
};

  // Manejar el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a la función de registro del backend
        const response = await registerUser(userData);
        console.log('Usuario registrado con éxito:', response);

      // redirigir a login
        navigate('/login');

    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
      // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
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
}

export default Register;
