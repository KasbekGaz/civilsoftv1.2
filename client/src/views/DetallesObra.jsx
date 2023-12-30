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
    }


    return (
        <div className="proyecto">
            <h1 className="text-3xl font-bold mb-4">Detalles de la Obra: "{obraData.nombre}"</h1>
            <button className="bg-green-400 py-2 px-4 mb-4" onClick={handleBack}>
                Regresar
            </button>

            <div className="">

                <div name="Seccion de Presupusto" className="grid grid-cols-2 md:grid-cols-2">

                    <div className="bg-slate-400 p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-2">Total de gastos $ {obraData.total_gastos }</h2>
                    </div>

                    <div className="bg-slate-400 p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-2">Presupuesto Inicial $ {obraData.p_inicial}</h2>
                    </div>
                </div>

                <div className='grid grid-cols-3'>
                    <div className="bg-sky-300 p-4 rounded-md">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Tareas</h3>
                            <button className="bg-yellow-500 py-2 px-4"
                                    onClick={handleTarea}
                            >Ver más</button>
                        </div>
                    </div>

                    <div className="bg-gray-600 p-4 rounded-md">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Control de Obra</h3>
                            <button className="bg-yellow-500 py-2 px-4">Ver más</button>
                        </div>
                    </div>

                    <div className="bg-violet-400 p-4 rounded-md">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Control Administrativo</h3>
                            <button className="bg-yellow-500 py-2 px-4"
                                onClick={handleControlAdmin}
                            >Ver más</button>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-200 p-4 rounded-md col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Galeria</h2>
                    <button className="bg-blue-500 py-2 px-4">Agregar Foto</button>
                </div>
            </div>
        </div>
    );
};

export default DetallesObra;

