import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";



const ControlAdmin = () => {
    const { id } = useParams(); //* id es de obra
    const [obraData, setObraData] = useState({});
    const [ gastos, setGastos ] = useState([]);


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
        categoria: 'Administracion',
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
                categoria: 'Administracion',
                facturado: 'No Facturado',
                Tipo: 'Efectivo',
                importe: '0',
            });
            fetchGastos();
        }catch(error){
            console.error('Error al crear Gasto', error.message);
        }
    };

    
    useEffect(() => {
        fetchObraDetails(); //*Obtener datos de la obra
        fetchGastos();

    }, [id])

    //! Para listar los gastos por id obra
    const fetchGastos = async () =>{
        try{
            console.log(id); //obra_id
            const gastoData = await APIbackend.listGastobyObra(id);
            setGastos(gastoData);
            console.log('id:', id , 'Datos Obtenidos: ', gastoData);

        }catch(error){
            console.error('Error al listar gastos', error.message)
        }
    };
    //! Para Actualizar gasto por su id
    const handleActualizar = (id, gastoId) =>{
        console.log('Datos que entran', id , gastoId);
        navigate(`/update-gasto-by-obra/${id}/${gastoId}`);
    };
    //! Para Eliminar un gasto por su id
    const handleEliminar = async (id, gastoId) => {
        try{
            await APIbackend.deleteGastobyObra(id, gastoId);
            alert('Eliminaste el gasto con exito!!')
            fetchGastos();
        }catch(error){
            console.error('Error al eliminar el gasto', error.message);
        }
    };


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

            <div class="Tabla-de-contenido">
                <h1>Lista de gastos</h1>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Proveedor</th>
                            <th>Concepto</th>
                            <th>Descripción</th>
                            <th>Categoria</th>
                            <th>Facturado</th>
                            <th>Tipo de Gasto</th>
                            <th>Importe $ </th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.map((gasto) => (
                            <tr key={gasto.id} >
                                <td>{gasto.id}</td>
                                <td>{gasto.fecha}</td>
                                <td>{gasto.proveedor}</td>
                                <td>{gasto.concepto}</td>
                                <td>{gasto.descripcion}</td>
                                <td>{gasto.categoria}</td>
                                <td>{gasto.facturado}</td>
                                <td>{gasto.Tipo}</td>
                                <td>{gasto.importe}</td>
                                <td>
                                    <button className="bg-orange-400"
                                    onClick={() => handleActualizar(id, gasto.id)}>
                                        Actualizar
                                    </button>

                                    <button className="bg-red-600"
                                    onClick={() => handleEliminar(id, gasto.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
};

export default ControlAdmin;