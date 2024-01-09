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
        <div className=" container mx-5 my-8  bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Detalles de la Obra:
            </h1>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">"{obraData.nombre}"</h2>

            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
                Regresar
            </button>

            <div className="container">

                <div className="grid grid-cols-2 md:grid-cols-2">

                    <div className="bg-slate-400 p-4 rounded-md">
                        <h2 className="text-3xl font-semibold mb-2">Total de gastos </h2>
                        <span className="text-2xl font-semibold text-white" >
                            $ {obraData.total_gastos }
                        </span>
                    </div>

                    <div className="bg-slate-400 p-4 rounded-md">
                        <h2 className="text-3xl font-semibold mb-2">Presupuesto Inicial</h2>
                        <span className="text-2xl font-semibold text-white">
                            $ {obraData.p_inicial}
                        </span>
                    </div>
                </div>

                <div className='grid grid-cols-3'>
                    <div className="bg-sky-300 p-4 rounded-md">
                        <div>
                            <h3 className="text-3xl font-semibold mb-2">Tareas</h3>
                            <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                                    onClick={handleTarea}
                            >Ver más</button>
                        </div>
                    </div>

                    <div className="bg-gray-600 p-4 rounded-md">
                        <div>
                            <h3 className="text-3xl font-semibold mb-2">Control de Obra</h3>
                            <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500" onClick={handleControlObra}>Ver más</button>
                        </div>
                    </div>

                    <div className="bg-violet-400 p-4 rounded-md">
                        <div>
                            <h3 className=" mx-auto text-3xl font-semibold mb-2">Control Administrativo</h3>
                            <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                                onClick={handleControlAdmin}
                            >Ver más</button>
                        </div>
                    </div>
                </div>

                <div className="bg-violet-600 p-4 rounded-md col-span-2">
                    <h2 className="text-3xl font-semibold mb-2">Galeria</h2>
                    <button className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        onClick={handleControlGaleria}>Agregar Foto</button>
                </div>
            </div>
        </div>
    );
};

export default DetallesObra;

