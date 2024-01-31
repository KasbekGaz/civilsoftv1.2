import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";

const ControlObra =  () =>{
    const { id } = useParams(); //* id es de la obra
    const [ obraData, setObraData ] = useState({});
    const [ volumen, setVolumen ] = useState([]);

    const navigate = useNavigate();

    const fetchObraDetails = async () =>{
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
    const [volumenData, setVolumenData] =useState({
        obra: id,
        codigo: '',
        unidad: '',
        concepto: '',
        estado: 'Sin cambio',
        //* Cantidad Contratada
        volumen: '0',
        precio: '0',
        //* Cantidad Ejecutada
        v_mod: '0',

    });
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setVolumenData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCreateVolumen = async () =>{
        try{
            console.log(volumenData);
            const response = await APIbackend.CreateVolumenbyObra(id, volumenData)

            console.log('Gasto creado: ', response);
            alert('Gasto agregado correctamente!');
            //*Para limpiar el formulario----
            setVolumenData({
                obra: id,
                codigo: '',
                unidad: '',
                concepto: '',
                estado: 'Sin cambio',
                //* Cantidad Contratada
                volumen: '0',
                precio: '0',
                //* Cantidad Ejecutada
                v_mod: '0',
                
            });
            fetchVolumen();
            fetchObraDetails();
        }catch(error){
            console.error('Error al agregar el concepto!', error.message);
        }
    };

    useEffect(() => {
        fetchObraDetails(); //*Obtener datos de la obra
        fetchVolumen();
    }, [id])

//! Listar los volumenes por id obra
const fetchVolumen = async () =>{
    try{
        const volumenData = await APIbackend.ListarVolumenbyObra(id);
        setVolumen(volumenData);
        console.log('Obra:', id, 'Datos Obtenidos: ', volumenData);

    }catch(error){
        console.error('Error al listar volumenes', error.message);
    }
}
//! Para actualizar volumen por su id
const handleActualizar = (id, volumenId) =>{
    console.log('Datos que entran', id , volumenId);
    navigate(`/update-volumen-by-obra/${id}/${volumenId}`);
};
//! Para Eliminar volumen por su di
const handleEliminar = async (id, volumenId) => {
    try{
        console.log('Datos que entran', id, volumenId);
        await APIbackend.deleteVolumenbyObra(id, volumenId);
        alert('Eliminaste el concepto con exito!!')
        fetchVolumen();
    }catch(error){
        console.error('Error al eliminar el gasto', error.message);
    }
};

return(
    <div className="mx-auto max-w-7xl p-4">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Comparativa de volumenes</h1>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Proyecto "{obraData.nombre}"</h1>

        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"
            onClick={handleBack}>
            Regresar a las acciones
        </button>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex-auto border border-violet-600 drop-shadow-xl rounded-2xl p-4">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Agregar Concepto</h1>

                <form className="flex flex-col justify-center items-center mt-2">
                    <label className="block my-2 font-medium">
                        Código:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="codigo"
                            value={volumenData.codigo}
                            onChange={handleInputChange}
                            />
                    <label className="block my-2 font-medium">
                        Unidad:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="unidad"
                            value={volumenData.unidad}
                            onChange={handleInputChange}
                            />
                    <label className="block my-2 font-medium">
                        Concepto:
                    </label>
                    <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            name="concepto"
                            placeholder="Describe el concepto"
                            value={volumenData.concepto}
                            onChange={handleInputChange}
                            />
                    <label className="block my-2 font-medium">
                        Estado del Concepto:
                    </label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="estado"
                            value={volumenData.estado}
                            onChange={handleInputChange}>
                                <option value="Sin cambio">Sin Cambío</option>
                                <option value="Deduccion">Deduccíon</option>
                                <option value="Adicional">Adicional</option>
                                <option value="Extraordinario">Extraordinario</option>
                        </select>
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Cantidad Contratada</h2>
                    <label className="block my-2 font-medium">
                        Volumen:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number" 
                                name="volumen"
                                value={volumenData.volumen} 
                                onChange={handleInputChange}/>
                    <label className="block my-2 font-medium">
                        Precio $ :
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number" 
                                name="precio"
                                value={volumenData.precio} 
                                onChange={handleInputChange}/>
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Cantidad Ejecutada</h2>
                    <label className="block my-2 font-medium">
                        Volumen Modificado:
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number" 
                                name="v_mod"
                                value={volumenData.v_mod} 
                                onChange={handleInputChange}/>

                    <button
                        className=" text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        type="button"
                        onClick={handleCreateVolumen}>
                            Agregar Concepto
                    </button>

                </form>
            </div>

            <div className="w-full p-4 ">

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Tabla de Conceptos</h1>

                <div className="overflow-x-auto mt-2">
                    <table className="w-full text-left rtl:text-right text-white">
                        <thead className="text-sm text-white uppercase">
                            <tr className="bg-gray-800 border-b">
                                <th scope="col" className="px-6 py-3 text-center rounded-s-2xl">ID</th>
                                <th scope="col" className="px-6 py-3 text-center">Código</th>
                                <th scope="col" className="px-6 py-3 text-center">Unidad</th>
                                <th scope="col" className="px-6 py-3 text-center">Concepto</th>
                                <th scope="col" className="px-6 py-3 text-center">Estado</th>
                                <th scope="col" className="px-6 py-3 text-center">Cantidad Contratada</th>
                                <th scope="col" className="px-6 py-3 text-center">Precio $ </th>
                                <th scope="col" className="px-6 py-3 text-center">Importe de Contratado</th>
                                <th scope="col" className="px-6 py-3 text-center">Cantidad Ejecutada</th>
                                <th scope="col" className="px-6 py-3 text-center">Importe de Ejecutado</th>
                                <th scope="col" className="px-6 py-3 text-center">Diferencia</th>
                                <th scope="col" className="px-6 py-3 text-center rounded-e-2xl">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volumen.map((vol) => (
                                <tr className="bg-gray-600 border-b" key={vol.id}>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.id}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.codigo}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.unidad}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.concepto}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.estado}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.volumen}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.precio}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.importe}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.v_mod}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.importe_mod}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{vol.diferencia}</td>
                                    <td scope="row" className="px-4 py-2 flex space-x-1 justify-items-center" >
                                        <button className="flex-1 text-center font-semibold rounded-full bg-orange-500 py-2 px-4  hover:bg-orange-600"
                                        onClick={() => handleActualizar(id, vol.id)}>
                                            Actualizar
                                        </button>
                                        <button className="flex-1 text-center font-semibold rounded-full bg-red-500 py-2 px-4 hover:bg-red-600"
                                        onClick={() => handleEliminar(id, vol.id) }
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
                            Total Importes Cantidad Contratada $
                            { obraData.total_importes }
                        </h1>
                    </div >
                    <div className="bg-gray-500 p-4 rounded-md">
                        <h1 className="text-xl font-semibold mb-2 mt-2">
                            Total Importes Cantidad Ejecutada $
                            { obraData.total_importes_mod }
                        </h1>
                    </div>
                </div>
                
            </div>
        </div>

    </div>
);

};

export default ControlObra;