import React, { useEffect, useState } from 'react';
import APIbackend from '../api/APIbackend';

const AllTareasView = () =>{
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        fetchTareas();
    }, []);

    const fetchTareas = async () =>{
        try{
            const tareasData = await APIbackend.getAllTareas();
            setTareas(tareasData);
            setLoading(false);
            console.log('Tareas:', tareasData );
        }catch(error){
            console.error('Error al obtener datos', error.message);
            setLoading(false);
        }
    }

return(
    <div className="w-full  p-4 ">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tareas Globales</h2>
        <div className="overflow-auto max-h-96">
            <table className="w-full text-left rtl:text-right text-white">
                <thead className="text-sm text-white uppercase">
                    <tr className="bg-gray-800 border-b">
                        <th scope="col" className="px-6 py-3 text-center rounded-s-2xl">Obra ID</th>
                        <th scope="col" className="px-6 py-3 text-center">Tarea</th>
                        <th scope="col" className="px-6 py-3 text-center rounded-e-2xl">Fecha Vence</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <div className="loader px-4 py-4"></div>}
                    {tareas.map((tarea)=>(
                        <tr className="bg-gray-600 border-b" key={tarea.id} >
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.obra}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.titulo}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold bg-red-500">{tarea.Fvence}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
}

export default AllTareasView;
