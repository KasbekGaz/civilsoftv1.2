import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";



const ControlAdmin = () => {
    const { id } = useParams();
    const [obraData, setObraData] = useState({});


    const navigate = useNavigate();

    const fetchObraDetails = async () => {
        try{
            console.log(id);
            const obraData = await APIbackend.getObraById(id);
            setObraData(obraData);

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
        obra: id,
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
            const response = await APIbackend.createGastobyObra(id, gastoData);
            console.log('Gasto creado: ', response);
            alert('Gasto agregado correctamente!');
            //*Para limpiar el formulario----
            setGastoData({
                obra: id,
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
                    <label className="mb-4">
                    Fecha :
                        <input
                            type="date"
                            name="fecha"
                            value={gastoData.fecha}
                            onChange={handleInputChange}
                            className="ml-4"
                        />
                    </label>

                    <label className="mb-4">
                        Proveedor :
                        <input 
                            type="text" 
                            name="proveedor"
                            value={gastoData.proveedor}
                            onChange={handleInputChange}
                            className="ml-4"/>
                    </label>

                    <label className="mb-4">
                        Concepto :
                        <input 
                            type="text" 
                            name="concepto"
                            value={gastoData.concepto}
                            onChange={handleInputChange}
                            className="ml-4"/>
                    </label>

                    <label className="mb-4">
                        Descripcion :
                        <input 
                            type="text" 
                            name="descripcion"
                            value={gastoData.descripcion}
                            onChange={handleInputChange}
                            className="ml-4"/>
                    </label>

                    <label className="mb-4">
                        Categoria del Gasto :
                        <select
                            name="categoria"
                            value={gastoData.categoria}
                            onChange={handleInputChange}>
                                <option value="Administracion">Administración</option>
                                <option value="Mano de obra">Mano de Obra</option>
                                <option value="Materiales">Materiales</option>
                                <option value="Viaticos">Viáticos</option>
                                <option value="Varios">Varios</option>
                        </select>
                    </label>

                    <label className="mb-4">
                        Facturado :
                        <select 
                            name="facturado"
                            value={gastoData.facturado}
                            onChange={handleInputChange}>
                                <option value="Facturado">Facturado</option>
                                <option value="No Facturado"> No Facturado</option>
                            </select>
                    </label>

                    <label className="mb-4">
                        Tipo de Gasto :
                        <select 
                            name="Tipo"
                            value={gastoData.Tipo}
                            onChange={handleInputChange}>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                    </label>

                    <label className="mb-4">
                        Importe $ :
                        <input 
                            type="number"
                            name="importe"
                            value={gastoData.importe || ''}
                            onChange={handleInputChange}/>
                    </label>

                    <button
                        className="bg-green-400"
                        type="button"
                        onClick={handleCreateGasto}>
                        Agregar Nuevo Gasto
                    </button>

                </form>
            </div>

            <div class="Tabla de contenido">

            </div>

        </div>
    );
};

export default ControlAdmin;