import React, { useEffect, useState } from "react";
import APIbackend from "../../api/APIbackend";
import { useNavigate, useParams } from "react-router-dom";


const UpdateTarea = () => {
    const { id, tareaId } = useParams();
    const navigate = useNavigate();

    console.log('Id de la obra:', id);
    console.log('Tarea que se actualiza:', tareaId);

    const [tareaData, setTareaData] = useState({
        Fvence: '',
        Fcreado: '',
        Fcompletado: null,
        titulo: '',
        descripcion: '',
        estado: 'no_completado',
        obra: id,
    });



    useEffect(() => {
        //* Cargar datos de la otarea al comprobar el componente
        const fetchTareaData = async () => {
            try {
                const tarea = await APIbackend.getTareaById(tareaId);
                console.log(tarea);
                setTareaData({
                    titulo: tarea.titulo,
                    descripcion: tarea.descripcion,
                    Fvence: tarea.Fvence,
                    Fcreado: tarea.Fcreado,
                    Fcompletado: tarea.Fcompletado,
                    estado: tarea.estado,
                    obra: tarea.obra,
                });
            } catch (error) {
                console.error('Error al obtener datos de la obra:', error.message);
            }
        };

        fetchTareaData();
    }, [tareaId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTareaData({ ...tareaData, [name]: value });
    };


    const handleUpdateTarea = async () => {
        try{
            console.log('Datos que entran: ', id, tareaId, tareaData);
            await APIbackend.updateTareaForObra(id, tareaId, tareaData );
            alert('Tarea actualizada correctamente !!');
            navigate(`/control-tarea/${id}`)
        }catch(error){
            console.error('Error al actualizar datos.', error.message);
        }
    }

//! Regresar a la vista anterior
    const handleBack = (id) =>{
        navigate(`/control-tarea/${id}`);
    }

    return(
<div className=" container mx-4 my-4 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg drop-shadow-xl">

    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Actualizar Tarea: {tareaData.titulo} </h1>

        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" 
        onClick={() => handleBack(id)}>
            Regresar
        </button>

        <form  className="flex flex-col justify-center items-center">
            <label className="block my-2 font-medium">
                Fecha Vencimiento:
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="date"
                    name="Fvence"
                    value={tareaData.Fvence}
                    onChange={handleInputChange}
                />
            </label>

            <label className="block my-2 font-medium">
                Fecha creada en:
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="date"
                    name="Fcreado"
                    value={tareaData.Fcreado}
                    onChange={handleInputChange}
                />
            </label>

            <label className="block my-2 font-medium">
                Titulo:
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="titulo"
                    value={tareaData.titulo}
                    onChange={handleInputChange}
                />
            </label>

            <label className="block my-2 font-medium">
                Descripciom:
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="descripcion"
                    value={tareaData.descripcion}
                    onChange={handleInputChange}
                />
            </label>

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
                className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500" 
                type="button"
                onClick={handleUpdateTarea} >
                Actualizar Tarea
            </button>
        </form>
</div>
    );
}

export default UpdateTarea;
