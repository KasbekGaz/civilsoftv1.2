import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIbackend from '../api/APIbackend';

const UpdateObraForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [obraData, setObraData] = useState({
        nombre: '',
        localidad: '',
        municipio: '',
        dependencia: '',
        fecha: '',
        p_inicial: '',
    });

    useEffect(() => {
        // Cargar datos de la obra al montar el componente
        const fetchObraData = async () => {
            try {
                const obra = await APIbackend.getObraById(id);
                setObraData({
                    nombre: obra.nombre,
                    localidad: obra.localidad,
                    municipio: obra.municipio,
                    dependencia: obra.dependencia,
                    fecha: obra.fecha,
                    p_inicial: obra.p_inicial,
                });
            } catch (error) {
                console.error('Error al obtener datos de la obra:', error.message);
            }
        };

        fetchObraData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObraData({ ...obraData, [name]: value });
    };

    const handleUpdateObra = async () => {
        try {
            await APIbackend.updateObra(id, obraData);
            alert('Obra actualizada correctamente');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al actualizar la obra:', error.message);
        }
    };

    const handleBack = () =>{
        navigate('/dashboard');
    };

    return (
        <div className=" container mx-4 my-4 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg drop-shadow-xl">

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Actualizando Obra "{obraData.nombre}"
                </h2>

                <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
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
                    value={obraData.nombre || ''}
                    onChange={handleInputChange}
                />

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

            <label className="block my-2 font-medium">
            Fecha:
            </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="date"
                    name="fecha"
                    value={obraData.fecha}
                    onChange={handleInputChange}
                />

            <label className="block my-2 font-medium">
            Presupuesto:
            </label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    name="p_inicial"
                    value={obraData.p_inicial || ''}
                    onChange={handleInputChange}
                />

                <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500" type="button" onClick={handleUpdateObra}>
                    Actualizar Obra
                </button>
            </form>
        </div>
    );
};

export default UpdateObraForm;
