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
                const gasto = await APIbackend.getGastoById(gastoId);
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
            navigate(`/control-gastos/${id}`);
        }catch(error){
            console.error('Error al actualizar datos.', error.message);
        }
    };

    const handleBack = (id) =>{
        navigate(`/control-gastos/${id}`);
    }

return(
    <div className="container mx-4 my-4 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg drop-shadow-xl">

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Actualizar Gasto: {gastoData.concepto}</h1>

        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" 
        onClick={() => handleBack(id)}>
            Regresar
        </button>

        <form  className="flex flex-col justify-center items-center">
        <label className="block my-2 font-medium">
                    Fecha :
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            name="fecha"
                            value={gastoData.fecha}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label className="block my-2 font-medium">
                        Proveedor :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="proveedor"
                            value={gastoData.proveedor}
                            onChange={handleInputChange}/>
                    </label>

                    <label className="block my-2 font-medium">
                        Concepto :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="concepto"
                            value={gastoData.concepto}
                            onChange={handleInputChange}/>
                    </label>

                    <label className="block my-2 font-medium">
                        Descripcion :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="descripcion"
                            value={gastoData.descripcion}
                            onChange={handleInputChange}/>
                    </label>

                    <label className="block my-2 font-medium">
                        Categoria del Gasto :
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                    <label className="block my-2 font-medium">
                        Facturado :
                        <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="facturado"
                            value={gastoData.facturado}
                            onChange={handleInputChange}>
                                <option value="Facturado">Facturado</option>
                                <option value="No Facturado"> No Facturado</option>
                            </select>
                    </label>

                    <label className="block my-2 font-medium">
                        Tipo de Gasto :
                        <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="Tipo"
                            value={gastoData.Tipo}
                            onChange={handleInputChange}>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                    </label>

                    <label className="block my-2 font-medium">
                        Importe $ :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="importe"
                            value={gastoData.importe || ''}
                            onChange={handleInputChange}/>
                    </label>

                    <button 
                        className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        type="button"
                        onClick={handleUpdateGasto}> 
                        Actualizar Gasto
                    </button>
        </form>

    </div>
);

};

export default UpdateGasto;