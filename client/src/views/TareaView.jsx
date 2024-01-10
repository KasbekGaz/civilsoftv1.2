import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";


const TareaView = () => {
    const { id } = useParams();//* id de obra
    const [obraData, setObraData] = useState({});
    const [tareas, setTareas] = useState([]);

    const navigate = useNavigate();

    const fetchObraDetails = async () => {
        try {
            console.log(id);
            
            const obraData = await APIbackend.getObraById(id);
            setObraData(obraData);

            console.log(id);
            
        } catch (error) {
            console.error('Error al obtener los detalles de la obra:', error.message);
        }
    };

    const handleBack = () => {
        console.log('Id de obra:', id);
        navigate(`/details-obra/${id}`);
    };
//! Para el formulario de Tareas --------------------
const [tareaData, setTareaData] = useState({
    Fvence: '',
    Fcreado: '',
    Fcompletado: null,
    titulo: '',
    descripcion: '',
    estado: 'no_completado',
    obra: id,
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTareaData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleCreateTarea = async () => {
    try {
        console.log(tareaData);
        
        const response = await APIbackend.createTareabyObra(id, tareaData);
        
        console.log('Tarea creada: ', response);

        alert('Tarea agregada correctamente !! ');
        //* Limpiar el formulario ---
        setTareaData({
            Fvence: '',
            Fcreado: '',
            Fcompletado: null,
            titulo: '',
            descripcion: '',
            estado: 'no_completado',
            obra: id,
        });
        fetchTareas();
    } catch (error) {
        console.error('Error al crear la TAREA', error.message);
    }
};

    useEffect(() => {
        fetchObraDetails(); //* Obtener datos de obra
        fetchTareas(); //* cargar los datos.
    }, [id]);
//! Para listar las tareas por id de Obra
const fetchTareas = async () =>{
    try{
        console.log(id); //obra_id
        const tareaData = await APIbackend.listTareaByObra(id);
        setTareas(tareaData);
        console.log('id:', id, 'Datos Tarea:', tareaData)
    }catch(error){
        console.error('Error al listar tareas.', error.message)
    }
};
//! Para actualizar una tarea por su id
const handleActualizar = (id, tareaId) => {
    console.log('Datos que entran: ', id, tareaId);
    navigate(`/update-tarea-by-obra/${id}/${tareaId}`)
};
//! Para Eliminar una tarea por su id
const handleEliminar = async (id, tareaId) => {
    try{
        console.log('Datos que entran: ', id, tareaId);
        await APIbackend.deleteTareaForObra(id, tareaId);
        alert('Eliminaste la tarea con exito !!');
        fetchTareas();
    }catch(error){
        console.log('Error al eliminar el gasto', error.message);
    }
};
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Proyecto "{obraData.nombre}"</h1>
            
            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
                Regresar a las Acciones
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Control de Tareas</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-2">
                <div className="container bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">
                    <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> Agregar Nueva tarea </h1>
                    <form  className="flex flex-col justify-center items-center">
                        <label className="block my-2 font-medium">
                            Fecha Vencimiento:
                        </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="date"
                                name="Fvence"
                                value={tareaData.Fvence}
                                onChange={handleInputChange}
                                />

                        <label className="block my-2 font-medium">
                            Fecha creada en:
                        </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="date"
                                name="Fcreado"
                                value={tareaData.Fcreado}
                                onChange={handleInputChange}
                                />

                        <label className="block my-2 font-medium">
                            Titulo:
                        </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="titulo"
                                value={tareaData.titulo}
                                onChange={handleInputChange}
                            />

                        <label className="block my-2 font-medium">
                            Descripcion:
                        </label>
                            <textarea
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                                    type="text"
                                    name="descripcion"
                                    value={tareaData.descripcion}
                                    onChange={handleInputChange}
                                />

                        <label className="block my-2 font-medium">
                            Estado de la tarea:
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="estado"
                                value={tareaData.estado}
                                onChange={handleInputChange}
                            >
                                <option value="no_completado">Incompleta</option>
                                <option value="completado">Completada</option>
                                <option value="vencida">Vencida</option>
                            </select>
                        </label>

                        <button
                            className=" text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                            type="button"
                            onClick={handleCreateTarea}
                        >
                            Crear Tarea
                        </button>
                    </form>
                </div>
                <div className="container ml-8 rounded-lg drop-shadow-xl">
                    <h1> Tabla de Tareas </h1>
                    
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
                                    <button className="text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                    onClick={() => handleActualizar(id, tarea.id)}>
                                        Actualizar
                                    </button>
                                    <button className="text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
                                    onClick={() => handleEliminar(id, tarea.id) }
                                        >
                                        Eliminar
                                    </button>
                                </td>
                                
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TareaView;


