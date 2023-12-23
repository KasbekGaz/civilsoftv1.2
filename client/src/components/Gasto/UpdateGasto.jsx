import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../../api/APIbackend";




const UpdateGasto = () =>{
    const { id, gastoId } = useParams();
    const navigate = useNavigate();


    console.log('Id de la Obra: ', id);
    console.log('Gasto que se actualiza: ', gastoId)

    const [ gastoData, setGastoData ] = useState({
        obra: id,
        fecha: '',
        proveedor: '',
        concepto: '',
        descripcion: '',
        categoria: 'Administracion',
        facturado: 'No Facturado',
        Tipo: 'Efectivo',
        importe: '0'
    });

    useEffect(() => {
        //* Cargar los datos antes de comprobar el componente
        const fetchGastoData = async () => {
            try{
                const gasto = await APIbackend.getGastoById(gastoId)
                console.log(gasto);
                setGastoData({
                    obra: gasto.obra,
                    fecha: gasto.fecha,
                    proveedor: gasto.proveedor,
                    concepto: gasto.concepto,
                    descripcion: gasto.descripcion,
                    categoria: gasto.categoria,
                    facturado: gasto.facturado,
                    Tipo: gasto.Tipo,
                    importe: gasto.importe
                });
            }catch(error){
                console.error('Error al obtener datos.', error.message);
            }
        };

        fetchGastoData();
    }, [gastoId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGastoData({ ...gastoData, [name]: value });
    };

    const handleUpdateGasto = async () =>{
        try{
            console.log('Datos que entran: ', id, gastoId, gastoData);
            await APIbackend.updateGastobyObra(id, gastoId, gastoData);
            alert('Gasto actualizado correctamente!!');
            navigate(`/control-gastos/${id}`)
        }catch(error){
            console.error('Error al actualizar datos.', error.message);
        }
    };

return(
    <div>
        <h1>Actualizar Tarea: {gastoData.concepto}</h1>
        <form  className="flex flex-col justify-center items-center">
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
                        onClick={handleUpdateGasto}> 
                        Actualizar Gasto
                    </button>
        </form>

    </div>
);

};

export default UpdateGasto;