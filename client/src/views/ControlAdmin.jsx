import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const generarArchivoExcel = (datos, nombreArchivo) => {
    const hojaDeTrabajo = XLSX.utils.json_to_sheet(datos);
    const libroDeTrabajo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeTrabajo, 'Datos');
    const datosExcel = XLSX.write(libroDeTrabajo, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([datosExcel], { type: 'application/octet-stream' });
    saveAs(blob, nombreArchivo + '.xlsx');
};


const ControlAdmin = () => {
    const { id } = useParams(); //* id es de obra
    const [obraData, setObraData] = useState({}); //*datos de la obra
    const [ gastos, setGastos ] = useState([]); //* datos de gastos de uan obra
    const [abonos, setAbonos] = useState([]);
    const [loading, setLoading] = useState(false);//* animacion de carga 


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
        importe: '',
    });
    //* Manejo de errores en formulario
    const [errors, setErrors] = useState({
        fecha: false,
        proveedor: false,
        concepto: false,
        descripcion: false,
        importe: false,
    });

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setGastoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        //limpiar mensaje de error cuando empezamos escribir
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };
    //! Formulario de ABONO
    const [abonoData, setAbonoData] = useState({
        obra: id,
        fecha: '',
        descripcion: '',
        importe: '',
    });
    const handleInputAbono = (e) =>{
        const { name, value } = e.target;
        setAbonoData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };
    //! Crear un GASTO
    const handleCreateGasto = async () => {
        //*validar se algun campo esta vacio
        const newErrors = {};
        let hasError = false;
        Object.entries(gastoData).forEach(([key, value]) =>{
            if (value===''){
                newErrors[key] = true;
                hasError = true;
            }
        });
        if (hasError){
            setErrors(newErrors);
            return;
        }

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
                importe: '',
            });
            fetchGastos();
            fetchObraDetails(); 
        }catch(error){
            console.error('Error al crear Gasto', error.message);
            alert('Porfavor verifique que los campos estan completos');
        }
    };
    //! Crear un ABONO
    const handleCreateAbono = async () =>{
        try{
            console.log(abonoData);
            const response = await APIbackend.CreateAbonobyObra(id, abonoData);
            console.log('Abono Creado', response);
            alert('Abono creado correctamente!');
            //* Limpiar formulario
            setAbonoData(prevData => ({
                ...prevData,
                fecha: '',
                descripcion: '',
                importe: ''
            }));
            fetchAbonos();
            fetchObraDetails();
        }catch(error){
            console.error('Error al crear Abono', error.message);
            alert('Porfavor verifique que los campos estan completos');
        }
    };
    
    useEffect(() => {
        fetchObraDetails(); //*Obtener datos de la obra
        fetchGastos(); //* obtener gastos de la obra
        fetchAbonos(); //* Obtener abonos de la obra
    }, [id])

    //! Para listar los gastos por id obra
    const fetchGastos = async () =>{
        try{
            console.log(id); //obra_id
            setLoading(true);//activar animacion
            const gastoData = await APIbackend.listGastobyObra(id);
            setGastos(gastoData);
            console.log('id:', id , 'Datos Obtenidos: ', gastoData);

        }catch(error){
            console.error('Error al listar gastos', error.message)
        }finally{
            setLoading(false)// desactivando animaicon
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

    //! Buscador por Concepto, Categoria y Factura o no
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroFacturado, setFiltroFacturado] = useState('');
    const [filtroTipoGasto, setFiltroTipoGasto] = useState('');
    const [filtroConcepto, setFiltroConcepto] = useState('');

    //* funcion para manejar cambios en el input busqueda por CATEGORIA
    const handleFiltroCategoria = (event) => {
        setFiltroCategoria(event.target.value);
    };
    //* Funcion para cambios en filtro Facturado
    const handleFiltroFacturado = (event) => {
        setFiltroFacturado(event.target.value);
    };
    //* Funcoin para cambios en filtro Tipo de Gasto
    const handleFiltroTipoGasto = (event) => {
        setFiltroTipoGasto(event.target.value);
    };
    //* Funcion para busqueda de Concepto
    const handleFiltroConcepto = (event) => {
        setFiltroConcepto(event.target.value);
    };
// ? Acciones de ABONO ------------------------
    //! Para listar los ABONOS por id obra
    const fetchAbonos = async () =>{
        try{
            console.log(id); //obra_id
            setLoading(true); //activamos animacion
            const abonoData = await APIbackend.ListarAbonobyObra(id);
            setAbonos(abonoData);
            console.log('id:', id , 'Abonos Obtenidos: ', abonoData);

        }catch(error){
            console.error('Error al listar abonos', error.message)
        }finally{
            setLoading(false); //desactivar animacion
        }
    };
    //! Actualizar ABONO
    const ActualizarAbono = (id, abonoId) =>{
        console.log('Datos que entran', id , abonoId);
        navigate(`/update-abono-by-obra/${id}/${abonoId}`);
    };
    //! Para Eliminar un ABONO por su id
    const EliminarAbono = async (id, abonoId) => {
        try{
            await APIbackend.deleteAbonobyObra(id, abonoId);
            alert('Eliminaste el ABONO con exito!!')
            fetchAbonos();
        }catch(error){
            console.error('Error al eliminar el abono', error.message);
        }
    };

    const handleGenerarExcel = () => {
        try{
            //! Convertir los datos de la tabla en un formato compatible con XLSX
            const datosParaExcel = gastos.map(gasto => ({
                ID: gasto.id,
                Fecha: gasto.fecha,
                Proveedor: gasto.proveedor,
                Concepto: gasto.concepto,
                Descripción: gasto.descripcion,
                Categoria: gasto.categoria,
                Facturado: gasto.facturado,
                'Tipo de Gasto': gasto.Tipo,
                'Importe $': parseFloat(gasto.importe)
            }));
            // ! Agregar datos adiccionales
            datosParaExcel.push({
                'Total de Gastos': parseFloat(obraData.total_gastos),
            });
            //! Generar y descargar el archivo Excel
            generarArchivoExcel(datosParaExcel, 'tabla_gastos_'+obraData.nombre);
        }catch(error){
            console.error('Error al crear el archivo Excel', error.message);
            alert('Ah ocurrido un error, intente de nuevo')
        }
    };

    const handleGenerarExcelAbono = () => {
        try{
            //! Convertir los datos de la tabla en un formato compatible con XLSX
            const datosParaExcel = abonos.map(abono => ({
                ID: abono.id,
                Fecha: abono.fecha,
                Descripción: abono.descripcion,
                'Importe $': parseFloat(abono.importe)
            }));
            // ! Agregar datos adiccionales
            datosParaExcel.push({
                'Total de Abonos': parseFloat(obraData.total_abonos),
            });
            //! Generar y descargar el archivo Excel
            generarArchivoExcel(datosParaExcel, 'tabla_Abonos_'+obraData.nombre);
        }catch(error){
            console.error('Error al crear el archivo Excel', error.message);
            alert('Ah ocurrido un error, intente de nuevo')
        }
    };


return(
    <div className="mx-auto max-w-7xl p-4">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Control de gastos para: </h1>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Proyecto "{obraData.nombre}"</h1>
        
        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"
        onClick={handleBack}
        > 
        Regresar a las Acciones
        </button>

        <div  className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full flex-auto bg-indigo-950 border border-black drop-shadow-xl rounded-2xl p-4">

                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Agregar Gasto</h1>

                <form className="flex flex-col justify-center items-center mt-2">
                    <label className="block my-2 font-medium">
                    Fecha :
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            name="fecha"
                            value={gastoData.fecha}
                            onChange={handleInputChange}
                        />
                        {errors.fecha && <p className="text-red-600">Este campo es requerido!</p>}
                    </label>

                    <label className="block my-2 font-medium">
                        Proveedor :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="proveedor"
                            value={gastoData.proveedor}
                            onChange={handleInputChange}
                            />
                            {errors.proveedor && <p className="text-red-600">Este campo es requerido!</p>}
                    </label>

                    <label className="block my-2 font-medium">
                        Concepto :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="concepto"
                            value={gastoData.concepto}
                            onChange={handleInputChange}
                            />
                            {errors.concepto && <p className="text-red-600">Este campo es requerido!</p>}
                    </label>

                    <label className="block my-2 font-medium">
                        Descripcion :
                        <textarea 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="descripcion"
                            placeholder="Agrega una descripcion corta."
                            value={gastoData.descripcion}
                            onChange={handleInputChange}
                            />
                            {errors.descripcion && <p className="text-red-600">Este campo es requerido!</p>}
                    </label>

                    <label className="block my-2 font-medium">
                        Categoria del Gasto :
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="facturado"
                            value={gastoData.facturado}
                            onChange={handleInputChange}>
                                <option value="No Facturado"> No Facturado</option>
                                <option value="Facturado">Facturado</option>
                            </select>
                    </label>

                    <label className="block my-2 font-medium">
                        Tipo de Gasto :
                        <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="importe"
                            placeholder="$00.0"
                            value={gastoData.importe || ''}
                            onChange={handleInputChange}/>
                            {errors.importe && <p className="text-red-600">Este campo es requerido!</p>}
                    </label>

                    <button
                        className=" text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        type="button"
                        onClick={handleCreateGasto}>
                        Agregar Nuevo Gasto
                    </button>

                </form>
            </div>

            <div className="w-full p-4 bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-2xl">Tabla de gastos</h1>

                    <div>
                        <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                            <input
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                placeholder="Buscar por Concepto"
                                value={filtroConcepto}
                                onChange={handleFiltroConcepto}
                            />
                        </div>

                        <div className="relative">
                            <label className="block my-2 font-medium">
                                Filtrar por Categoria:
                            </label>
                            <select 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                value={filtroCategoria} onChange={handleFiltroCategoria}>
                                <option value="">Todas las categorías</option>
                                <option value="Administracion">Administración</option>
                                <option value="Mano de obra">Mano de obra</option>
                                <option value="Materiales">Materiales</option>
                                <option value="Viaticos">Viáticos</option>
                                <option value="Varios">Varios</option>
                            </select>
                        </div>

                        <div className="realtive">
                            <label className="block my-2 font-medium">
                                Filtrar por Facturado 0 No facturado:
                            </label>  
                            <select 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={filtroFacturado} onChange={handleFiltroFacturado}>
                                <option value="">Todas las Categorias</option>
                                <option value="Facturado">Facturado</option>
                                <option value="No Facturado">No Facturado</option>
                            </select>
                        </div>

                        <div className="relative">
                            <label className="block my-2 font-medium">
                                Filtrar por Tipo de Gasto:
                            </label>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={filtroTipoGasto} onChange={handleFiltroTipoGasto}>
                                <option value="">Todas las Categorias</option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Efectivo">Efectivo</option>
                            </select>
                        </div>

                    </div>

                <div className="overflow-auto mt-2">
                    <table className="w-full text-left rtl:text-right text-white">
                        <thead className="text-sm text-white uppercase">
                            <tr className="bg-gray-800 border-b">
                                <th scope="col" className="px-6 py-3 text-center rounded-s-2xl">ID</th>
                                <th scope="col" className="px-6 py-3 text-center">Fecha</th>
                                <th scope="col" className="px-6 py-3 text-center">Proveedor</th>
                                <th scope="col" className="px-6 py-3 text-center">Concepto</th>
                                <th scope="col" className="px-6 py-3 text-center">Descripción</th>
                                <th scope="col" className="px-6 py-3 text-center">Categoria</th>
                                <th scope="col" className="px-6 py-3 text-center">Facturado</th>
                                <th scope="col" className="px-6 py-3 text-center">Tipo de Gasto</th>
                                <th scope="col" className="px-6 py-3 text-center">Importe $ </th>
                                <th scope="col" className="px-6 py-3 text-center rounded-e-2xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {loading && <div className="loader"></div>}
                            {gastos.filter(gasto => 
                        (filtroCategoria === '' || gasto.categoria === filtroCategoria) && // Filtro por categoría
                        (filtroFacturado === '' || gasto.facturado === filtroFacturado) && // Filtro por estado de facturado
                        (filtroConcepto === '' || gasto.concepto.toLowerCase().includes(filtroConcepto.toLowerCase())) && 
                        (filtroTipoGasto === '' || gasto.Tipo === filtroTipoGasto) 
                    ).map((gasto) => (
                                <tr className="bg-gray-600 border-b" key={gasto.id} >
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.id}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.fecha}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.proveedor}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.concepto}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.descripcion}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.categoria}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.facturado}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.Tipo}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{gasto.importe}</td>
                                    <td scope="row" className="px-4 py-2 flex space-x">
                                        <button className="flex-1 text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                        onClick={() => handleActualizar(id, gasto.id)}>
                                            Actualizar
                                        </button>

                                        <button className="flex-1 text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
                                        onClick={() => handleEliminar(id, gasto.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2">
                    <div className="bg-gray-500 p-4 rounded-md">
                        <h1 className="text-xl font-semibold mb-2 mt-2">
                            Total de Gastos $
                            { obraData.total_gastos }
                        </h1>
                    </div>
                    <div className="bg-gray-500 p-4 rounded-md">
                        <button 
                            onClick={handleGenerarExcel}
                            className="flex-1 text-center font-semibold rounded-full bg-emerald-600 py-2 px-4 mb-4 mt-4 hover:bg-green-700">Generar Excel</button>
                    </div>
                </div>
            </div>
        </div>

        <h1 className="my-3 text-3xl font-bold tracking-tight text-white sm:text-3xl"> Control de Abonos de "{obraData.nombre }" </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full flex-auto bg-indigo-950 border border-black drop-shadow-xl rounded-2xl p-4">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Agregar Abono</h1>
                <form  className="flex flex-col justify-center items-center mt-2">
                    <label  className="block my-2 font-medium">
                        Fecha: 
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            name="fecha"
                            value={abonoData.fecha}
                            onChange={handleInputAbono}/>
                    </label>
                    <label className="block my-2 font-medium">
                        Descripcion:
                        <textarea 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="descripcion"
                            placeholder="Comentarios"
                            value={abonoData.descripcion}
                            onChange={handleInputAbono}></textarea>
                    </label>
                    <label className="block my-2 font-medium">
                        Importe $ :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="importe"
                            placeholder="$00.0"
                            value={abonoData.importe}
                            onChange={handleInputAbono}
                            />
                    </label>

                    <button
                        className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        type="button"
                        onClick={handleCreateAbono}>
                        Agregar Abono
                    </button>
                </form>
            </div>
            <div className="w-full p-4 bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-2xl">Tabla de Abonos</h1>
                    <div className="overflow-auto mt-2">
                        <table className="w-full text-left rtl:text-right text-white">
                            <thead className="text-sm text-white uppercase">
                                <tr className="bg-gray-800 border-b">
                                    <th scope="col" className="px-6 py-3 text-center rounded-s-2xl">ID</th>
                                    <th scope="col" className="px-6 py-3 text-center">Fecha</th>
                                    <th scope="col" className="px-6 py-3 text-center">Descripcion</th>
                                    <th scope="col" className="px-6 py-3 text-center">Importe $</th>
                                    <th scope="col" className="px-6 py-3 text-center rounded-e-2xl">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {loading && <div className="loader"></div>}
                            {abonos.map((abono) => (
                                <tr className="bg-gray-600 border-b" key={abono.id} >
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{abono.id}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{abono.fecha}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{abono.descripcion}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{abono.importe}</td>
                                    <td scope="row" className="px-4 py-2 flex space-x">
                                        <button className="flex-1 text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                        onClick={() => ActualizarAbono(id, abono.id)}
                                        >
                                            Actualizar
                                        </button>

                                        <button className="flex-1 text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
                                        onClick={()=> EliminarAbono(id, abono.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-2">
                        <div className="bg-gray-500 p-4 rounded-md">
                            <h1 className="text-xl font-semibold mb-2 mt-2">
                                Total de Abonos $
                                { obraData.total_abonos }
                            </h1>
                        </div>
                        <div className="bg-gray-500 p-4 rounded-md">
                            <button 
                                onClick={handleGenerarExcelAbono}
                                className="flex-1 text-center font-semibold rounded-full bg-emerald-600 py-2 px-4 mb-4 mt-4 hover:bg-green-700">Generar Excel</button>
                        </div>
                    </div>
            </div>
        </div>

    </div>
);
};

export default ControlAdmin;