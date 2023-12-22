import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";



const ControlAdmin = () => {
    const { id } = useParams();
    const [obraData, setObraData] = useState({});
    const [ obraId = id, setObraId] = useState({});

    const navigate = useNavigate();

    const fetchObraDetails = async () => {
        try{
            console.log(id);
            const obraData = await APIbackend.getObraById(id);
            setObraData(obraData);
            setObraId(id);

        }catch(error){
            console.error('Error al obtener datos.', error.message);
        }
    };

    const handleBack = () =>{
        console.log('El id:', id);
        navigate(`/details-obra/${id}`);
    };
    //! Para el formulario se usa esto--------------------
    const [gastoData, setGastoData] =useState({
        obra: obraId,
        fecha: '',
        proveedor: '',
        concepto: '',
        descripcion: '',
        categoria: '',
        facturado: 'No Facturado',
        Tipo: 'Efectivo',
        importe: '0',
    });

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setGastoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateGasto = async () => {
        try{
            console.log(gastoData);
            const response = await APIbackend.createGastobyObra(obraId, gastoData);
            console.log('Gasto creado: ', response);
            alert('Gasto agregado correctamente!');
            //*Para limpiar el formulario----
            setGastoData({
                obra: obraId,
                fecha: '',
                proveedor: '',
                concepto: '',
                descripcion: '',
                categoria: '',
                facturado: 'No Facturado',
                Tipo: 'Efectivo',
                importe: '0',
            });
        }catch(error){
            console.error('Error al crear Gasto', error.message);
        }
    };

    
    useEffect(() => {
        fetchObraDetails(); //*Obtener datos de la obra

    }, [id])
    return(
        <div>
            <h1>Control de gastos para: </h1>
            <h1>Proyecto "{obraData.nombre}"</h1>
            
            <button className="bg-green-400 py-2 px-4 mb-4"
            onClick={handleBack}
            > 
            Regresar a las Acciones
            </button>

            <div class="Formulario">
                <form className="flex flex-col justify-center items-center">

                </form>
            </div>

            <div class="Tabla de contenido">

            </div>

        </div>
    );
};

export default ControlAdmin;