import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TareaList from "../components/Tarea/TareaList";
import TareaForm from "../components/Tarea/TareaForm";
import APIbackend from "../api/APIbackend";

const TareaView = () => {
    const { id } = useParams();
    const [obraData, setObraData] = useState({});

    const [obraId, setObraId] = useState(null);

    const navigate = useNavigate();

    const fetchObraDetails = async () => {
        try {
            console.log(id);
            
            const obraData = await APIbackend.getObraById(id);
            setObraData(obraData);

            setObraId(id);

            console.log(id);
            
        } catch (error) {
            console.error('Error al obtener los detalles de la obra:', error.message);
        }
    };




    useEffect(() => {
        fetchObraDetails();
    }, [id]);


    const handleBack = () => {
        navigate(`/dashboard`)
    };

    return (
        <div>
            <h1>Proyecto "{obraData.nombre}"</h1>

            <h2>Control de Tareas:</h2>
            
            <button className="bg-green-400 py-2 px-4 mb-4" onClick={handleBack}>
                Regresar
            </button>

            <div>
                {obraId && <TareaForm obraId={obraId} />}
            </div>

            <div>
                {obraId && <TareaList obraId={obraId} />}
            </div>

        </div>
    );
};

export default TareaView;


