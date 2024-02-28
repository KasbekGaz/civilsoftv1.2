import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'; //errores formularios
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
//! Manejar errores en formulario
const { register, handleSubmit, formState: { errors } } = useForm();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObraData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateObra = async () =>{
        try{
            const response = await APIbackend.createObra(obraData);

            console.log('Obra Creada', response);
            alert('Obra creada correctamente');
            navigate('/dashboard');

        }catch(error){
            console.error('Error al crear la obra: ', error.message);
        }
    };

    const handleBack = () =>{
        navigate('/dashboard');
    };


const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
        // Si no hay errores, crear la obra
        handleCreateObra();
        reset(); // Limpiar el formulario después de enviar
    }
};
return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto my-6 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Registrar Nueva Obra</h1>

        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
            Regresar
        </button>

            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <label className="block my-2 font-medium">
                    Nombre:
                </label>
                <input 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="nombre"
                    value={obraData.nombre}
                    onChange={handleInputChange}
                    {...register('nombre', { required: true })}
                />
                {errors.nombre && <p className="text-red-500 text-sm">Por favor ingrese el nombre</p>}

                <label className="block my-2 font-medium">
                    Localidad:
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="localidad"
                    value={obraData.localidad}
                    onChange={handleInputChange}
                    {...register('localidad', { required: true })}
                />
                {errors.localidad && <p className="text-red-500 text-sm">Por favor ingrese el localidad</p>}

                <label className="block my-2 font-medium">
                    Municipio:
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="municipio"
                    value={obraData.municipio}
                    onChange={handleInputChange}
                    {...register('municipio', { required: true })}
                />
                {errors.municipio && <p className="text-red-500 text-sm">Por favor ingrese el municipio</p>}

                <label className="block my-2 font-medium">
                    Dependencia:
                </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="dependencia"
                    value={obraData.dependencia}
                    onChange={handleInputChange}
                    {...register('dependencia', { required: true })}
                />
                {errors.dependencia && <p className="text-red-500 text-sm">Por favor ingrese la dependencia</p>}

                <label className="block my-2 font-medium">
                    Fecha:
                </label>
                <input
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="date"
                    name="fecha"
                    value={obraData.fecha}
                    onChange={handleInputChange}
                    {...register('fecha', { required: true })}
                />
                {errors.fecha && <p className="text-red-500 text-sm">Por favor ingrese el la fecha</p>}

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
                    {...register('p_inicial', { required: true })}
                />
                {errors.p_inicial && <p className="text-red-500 text-sm">Por favor ingrese el la fecha</p>}

                <button 
                    className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                    type="submit" onClick={handleCreateObra}>
                    Crear Obra
                </button>
            </form>


        </div>
    </div>
);

}

export default ObraForm;