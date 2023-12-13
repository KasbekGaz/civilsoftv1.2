import React, { useEffect, useState } from "react";
import APIbackend from "../../api/APIbackend";



const TareaList = ({ obraId }) =>{
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const tareaData = await APIbackend.listTareaByObra(obraId);
                setTareas(tareaData);
            } catch (error) {
                console.error('Error al obtener la lista de Tareas: ', error.message);
            }
        };

        fetchTareas();
    }, [obraId]);

return (
    <div>
        <h1>Lista de Tareas</h1>

        <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Fecha Creada</th>
            <th>Fecha Vencimiento</th>
            <th>Fecha Completado</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Estado de la Tarea</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {tareas.map((tarea) => (
            <tr key={tarea.id}>
                <td>{tarea.id}</td>
                <td>{tarea.Fvence}</td>
                <td>{tarea.Fcreado}</td>
                <td>{tarea.Fcompletado}</td>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.estado}</td>
                <td>
                    <button className='bg-orange-400'
                    onClick={() => handleActualizar(tarea.id)}>
                        Actualizar
                    </button>
                    <button className='bg-red-600'
                    onClick={() => handleEliminar(tarea.id) }
                        >
                        Eliminar
                    </button>
                </td>
                
            </tr>
            ))}
        </tbody>
        </table>
    </div>
);
};



export default TareaList;