import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import APIbackend from '../api/APIbackend';

const DetallesObra = () => {
    const { id } = useParams();
    const [obraData, setObraData] = useState({});
    const navigate = useNavigate();



    const fetchObraDetails = async () => {
        try {
            console.log(id);
            
            const obraData = await APIbackend.getObraById(id);
            setObraData(obraData);
        } catch (error) {
            console.error('Error al obtener los detalles de la obra:', error.message);
        }
    };


    useEffect(() => {
        fetchObraDetails();
    }, [id]);


    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleTarea = () => {
        console.log('El id:', id);
        navigate(`/control-tarea/${id}`);
    };

    const handleControlAdmin = () => {
        console.log('El id: ', id);
        navigate(`/control-gastos/${id}`);
    };

    const handleControlObra = () => {
        console.log('El id:', id);
        navigate(`/control-obra/${id}`);
    };

    const handleControlGaleria = () => {
        console.log('El id: ', id);
        navigate(`/control-galeria/${id}`);
    };


return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" container mx-5 my-8  bg-indigo-950 rounded-2xl drop-shadow-xl border border-black">

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Detalles de la Obra:
        </h1>

        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
            Regresar
        </button>

            <div className="container">

                <div className="my-2 items-center text-center">
                    <h3 className="block my-2 font-medium">
                        Nombre:
                    </h3>
                    <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> {obraData.nombre} </h3>
                    </label>

                    <h3 className="block my-2 font-medium">
                        Municipio:
                    </h3>
                    <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                        <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl">  {obraData.municipio} </h3>
                    </label>

                    <h3 className="block my-2 font-medium">
                        Localidad:
                    </h3>
                    <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                        <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl"> {obraData.localidad} </h3>
                    </label>

                    <h3 className="block my-2 font-medium">
                        Dependencia:
                    </h3>
                    <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                        <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl">  {obraData.dependencia} </h3>
                    </label>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-2">

                    <div className="bg-slate-600 p-4 rounded-md border border-black">
                        <h2 className="text-2xl font-semibold mb-2 text-white">Total de gastos </h2>
                        <span className="text-3xl font-semibold text-white" >
                            $ {obraData.total_gastos }
                        </span>
                    </div>

                    <div className="bg-slate-600 p-4 rounded-md border border-black">
                        <h2 className="text-2xl font-semibold mb-2 text-white">Presupuesto Inicial</h2>
                        <span className="text-3xl font-semibold text-white">
                            $ {obraData.p_inicial}
                        </span>
                    </div>
                </div>

                <div className='grid grid-cols-3'>
                    <div className="bg-indigo-950 p-4 rounded-md border border-black">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Tareas</h3>
                            <img src="/tareas.svg" alt="Icon" className="mx-auto max-w-40 h-40"/>
                            <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                                    onClick={handleTarea}
                            >Ver más</button>
                        </div>
                    </div>

                    <div className="bg-indigo-950 p-4 rounded-md border border-black">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Control de Obra</h3>
                            <img src="/control-obra.svg" alt="Icon" className="mx-auto max-w-40 h-40"/>
                            <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500" onClick={handleControlObra}>Ver más</button>
                        </div>
                    </div>

                    <div className="bg-indigo-950 p-4 rounded-md border border-black">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">Control Administrativo</h3>
                            <img src="/admin-money.svg" alt="Icon" className="mx-auto max-w-40 h-40"/>
                            <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                                onClick={handleControlAdmin}
                            >Ver más</button>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-950 p-4 rounded-md col-span-2 border border-black">
                    <h2 className="text-2xl font-semibold mb-2">Galeria</h2>
                    <img src="/galeria.svg" alt="Icon" className="mx-auto max-w-40 h-40"/>
                    <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        onClick={handleControlGaleria}>Agregar Foto</button>
                </div>
            </div>
        </div>
    </div>
);
};

export default DetallesObra;

