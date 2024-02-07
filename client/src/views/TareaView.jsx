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

//! Buscador de tareas
    const [searchTerm, setSearchTerm] = useState('');
    const filteredTarea = tareas.filter((tarea) =>
        tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="mx-auto max-w-7xl p-4">

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Control de Tareas</h1>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Proyecto "{obraData.nombre}"</h1>
            
            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
                Regresar a las Acciones
            </button>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="w-full flex-auto border border-violet-600 drop-shadow-xl rounded-2xl">

                    <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> Agregar Nueva tarea </h1>

                    <form  className="flex flex-col justify-center items-center mt-2">
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
                                    placeholder="Describe la tarea brevemente"
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

                <div className="w-full  p-4 ">

                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl" > Tabla de Tareas </h1>

                    <div className="my-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                            <input
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Buscar por Titulo de la Tarea"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-2">
                        <table className="w-full text-left rtl:text-right text-white">
                            <thead className="text-sm text-white uppercase">
                                <tr className="bg-gray-800 border-b">
                                <th scope="col" className="px-6 py-3 text-center rounded-s-2xl">ID</th>
                                <th scope="col" className="px-6 py-3 text-center">Titulo</th>
                                <th scope="col" className="px-6 py-3 text-center">Descripcion</th>
                                <th scope="col" className="px-6 py-3 text-center">Fecha Creada</th>
                                <th scope="col" className="px-6 py-3 text-center">Fecha Vencimiento</th>
                                <th scope="col" className="px-6 py-3 text-center">Fecha Completado</th>
                                <th scope="col" className="px-6 py-3 text-center">Estado de la Tarea</th>
                                <th scope="col" className="px-6 py-3 text-center rounded-e-2xl">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTarea.map((tarea) => (
                                <tr className="bg-gray-600 border-b"  key={tarea.id}>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.id}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.titulo}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.descripcion}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.Fvence}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.Fcreado}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.Fcompletado}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{tarea.estado}</td>
                                    <td scope="row" className="px-4 py-2 flex space-x-">
                                        <button className="flex-1 text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                        onClick={() => handleActualizar(id, tarea.id)}>
                                            Actualizar
                                        </button>
                                        <button className="flex-1 text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
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
        </div>
    );
};

export default TareaView;


