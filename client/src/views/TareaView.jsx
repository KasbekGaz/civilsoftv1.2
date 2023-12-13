import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import APIbackend from "../api/APIbackend";
import TareaList from "../components/Tarea/TareaList";
import TareaForm from "../components/Tarea/TareaForm";

const TareaView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [obraData, setObraData] = useState({});

    useEffect(() => {
        const fetchObraData = async () => {
            try {
                const obra = await APIbackend.getObraById(id);
                setObraData(obra);
            } catch (error) {
                console.error('Error al obtener datos de la obra:', error.message);
            }
        };

        fetchObraData();
    }, [id]);

    const handleBack = () => {
        navigate('/dashboard');
    };

    console.log('ID de la obra en TareaView:', id);
    return (
        <div>
            <h1>Proyecto "{obraData.nombre}"</h1>

            <h2>Control de Tareas:</h2>
            
            <button className="bg-green-400 py-2 px-4 mb-4" onClick={handleBack}>
                Regresar
            </button>

            <div>
                {/* Asegúrate de pasar el ID de la obra a TareaForm */}
                <TareaForm obraId={id} />
            </div>

            <div>
                {/* Asegúrate de pasar el ID de la obra a TareaList */}
                <TareaList obraId={id} />
            </div>
        </div>
    );
};

export default TareaView;


