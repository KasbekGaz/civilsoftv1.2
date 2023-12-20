import React, { useState } from "react";
import APIbackend from '../../api/APIbackend';



const TareaForm = ({ obraId }) =>{

    
    console.log("obraId en TareaForm:", obraId);

    const [tareaData, setTareaData] = useState({
        Fvence: '',
        Fcreado: '',
        Fcompletado: null,
        titulo: '',
        descripcion: '',
        estado: 'no_completado',
        obra: obraId,
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
            
            const response = await APIbackend.createTareabyObra(obraId, tareaData);
            
            console.log('Tarea creada: ', response);

            alert('Tarea agregada correctamente');
            // Puedes agregar lógica adicional si es necesario
            // Limpiar el formulario
            setTareaData({
                Fvence: '',
                Fcreado: '',
                Fcompletado: null,
                titulo: '',
                descripcion: '',
                estado: 'no_completado',
                obra: obraId,
            });


        } catch (error) {
            console.error('Error al crear la TAREA', error.message);
        }
    };

return(
<div>
    <h2>Crear Nueva tarea </h2>

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
                onClick={handleCreateTarea}
            >
                Crear Tarea
            </button>
        </form>
    </div>
);

};

export default TareaForm;