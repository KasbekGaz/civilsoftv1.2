import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import APIbackend from '../api/APIbackend';


const ObraForm = () =>{
    const navigate = useNavigate();

    const [obraData, setObraData] = useState({
        nombre: '',
        localidad: '',
        municipio: '',
        dependencia: '',
        fecha: '',
        p_inicial: '',
    });
//* Manejo de errores
    const [errors, setErrors] = useState({
        nombre: false,
        localidad: false,
        municipio: false,
        dependencia: false,
        fecha: false,
        p_inicial: false,
    }); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObraData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        //*Limpiar el mensaje
        setErrors((prevErrors) =>({
            ...prevErrors,
            [name]: false,
        }));
    };

    const handleCreateObra = async () =>{
        //* Validar si algún campo está vacío
        const newErrors = {};
        let hasError = false;
        Object.entries(obraData).forEach(([key, value]) => {
            if (value === '') {
                newErrors[key] = true;
                hasError = true;
            }
        });
        if (hasError) {
            setErrors(newErrors);
            return;
        }
        //*Peticion al backend
        try{
            const response = await APIbackend.createObra(obraData);

            console.log('Obra Creada', response);
            alert('Obra creada correctamente');
            navigate('/dashboard');

        }catch(error){
            console.error('Error al crear la obra: ', error.message);
            alert('!Ha ocurrido un error al crear la obra!');
        }
    };

    const handleBack = () =>{
        navigate('/dashboard');
    };


return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto my-6 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Registrar Nueva Obra</h1>

            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack} >
            Regresar
            </button>

            <form className="flex flex-col justify-center items-center">
                <label className="block my-2 font-medium">
                    Nombre:
                </label>
                <input 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="nombre"
                    value={obraData.nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <p className="text-red-600">Este campo es requerido!</p> }

                <label className="block my-2 font-medium">
                    Localidad:
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="localidad"
                    value={obraData.localidad}
                    onChange={handleInputChange}
                />
                {errors.localidad && <p className="text-red-600">Este campo es requerido!</p> }

                <label className="block my-2 font-medium">
                    Municipio:
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="municipio"
                    value={obraData.municipio}
                    onChange={handleInputChange}
                />
                {errors.municipio && <p className="text-red-600">Este campo es requerido!</p> }

                <label className="block my-2 font-medium">
                    Dependencia:
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="dependencia"
                    value={obraData.dependencia}
                    onChange={handleInputChange}
                />
                {errors.dependencia && <p className="text-red-600">Este campo es requerido!</p> }

                <label className="block my-2 font-medium">
                    Fecha:
                </label>
                <input
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="date"
                    name="fecha"
                    value={obraData.fecha}
                    onChange={handleInputChange}
                />
                {errors.fecha && <p className="text-red-600">Este campo es requerido!</p> }

                <label className="block my-2 font-medium">
                    Presupuesto:
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    name="p_inicial"
                    placeholder='$ 00.0'
                    value={obraData.p_inicial || ''}
                    onChange={handleInputChange}
                />
                {errors.p_inicial && <p className="text-red-600">Este campo es requerido!</p> }

                <button 
                    className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                    type="button" onClick={handleCreateObra}>
                    Crear Obra
                </button>
            </form>


        </div>
    </div>
);

}

export default ObraForm;