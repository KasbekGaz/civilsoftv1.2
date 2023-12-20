import React, { useEffect, useState } from "react";
import APIbackend from "../../api/APIbackend";
import { useNavigate, useParams } from "react-router-dom";


const UpdateTarea = () => {
    const { obraId, tareaId } = useParams();
    const navigate = useNavigate();

    console.log('Obraid en UpdateTarea:', obraId);
    console.log('Tarea que se actualiza:', tareaId);

    const [tareaData, setTareaData] = useState({
        Fvence: '',
        Fcreado: '',
        Fcompletado: null,
        titulo: '',
        descripcion: '',
        estado: 'no_completado',
        obra: obraId,
    });



    useEffect(() => {
        // Cargar datos de la otarea al comprobar el componente
        const fetchTareaData = async () => {
            try {
                const tarea = await APIbackend.getTareaById(tareaId);
                setTareaData({
                    titulo: tarea.titulo,
                    descripcion: tarea.descripcion,
                    Fvence: tarea.Fvence,
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
            console.log('Datos que entran: ', obraId, tareaId, tareaData);
            await APIbackend.updateTareaForObra(obraId, tareaId, tareaData );
            alert('Tarea actualizada correctamente !!');
            navigate(`/details-tarea/${obraId}`)
        }catch(error){

        }
    }

    return(
        <div>
    <h1>Actualizar Tarea: {tareaData.titulo} </h1>

        <form  className="flex flex-col justify-center items-center">
            <label className="mb-4">
                Fecha Vencimiento:
                <input
                    type="date"
                    name="Fvence"
                    value={tareaData.Fvence}
                    onChange={handleInputChange}
                    className="ml-4"
                />
            </label>

            <label className="mb-4">
                Fecha creada en:
                <input
                    type="date"
                    name="Fcreado"
                    value={tareaData.Fcreado}
                    onChange={handleInputChange}
                />
            </label>

            <label className="mb-4">
                Titulo:
                <input
                    type="text"
                    name="titulo"
                    value={tareaData.titulo}
                    onChange={handleInputChange}
                />
            </label>

            <label className="mb-4">
                Descripciom:
                <input
                    type="text"
                    name="descripcion"
                    value={tareaData.descripcion}
                    onChange={handleInputChange}
                />
            </label>

            <label className="mb-4">
                Estado de la tarea:
                <select
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
                className='bg-green-400'
                type="button"
                onClick={handleUpdateTarea} >
                Actualizar Tarea
            </button>
        </form>
    </div>
    );
}

export default UpdateTarea;
