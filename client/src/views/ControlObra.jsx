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
    <div>
        <h1>Comparativa de volumenes</h1>
        <h1>Proyecto "{obraData.nombre}"</h1>

        <button className="bg-green-400 py-2 px-4 mb-4"
            onClick={handleBack}>
            Regresar a las acciones
        </button>
        <div>
            <h1>Agregar Concepto</h1>
            <form className="flex flex-col justify-center items-center mt-2">
                <label className="mb-4">
                    Código:
                    <input className="ml-2"
                        type="text" 
                        name="codigo"
                        value={volumenData.codigo}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Unidad:
                    <input className="ml-2"
                        type="text" 
                        name="unidad"
                        value={volumenData.unidad}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Concepto:
                    <input className="ml-2"
                        type="text" 
                        name="concepto"
                        value={volumenData.concepto}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Estado del Concepto:
                    <select 
                        name="estado" 
                        value={volumenData.estado}
                        onChange={handleInputChange}>
                            <option value="Sin cambio">Sin Cambío</option>
                            <option value="Deduccion">Deduccíon</option>
                            <option value="Adicional">Adicional</option>
                            <option value="Extraordinario">Extraordinario</option>
                    </select>
                </label>
                <h2>Cantidad Contratada</h2>
                <label className="mb-4">
                    Volumen:
                        <input className="ml-2"
                            type="number" 
                            name="volumen"
                            value={volumenData.volumen} 
                            onChange={handleInputChange}/>
                </label>
                <label className="mb-4">
                    Precio $ :
                        <input className="ml-2"
                            type="number" 
                            name="precio"
                            value={volumenData.precio} 
                            onChange={handleInputChange}/>
                </label>
                <h2>Cantidad Ejecutada</h2>
                <label className="mb-4">
                    Volumen Modificado:
                        <input className="ml-2"
                            type="number" 
                            name="v_mod"
                            value={volumenData.v_mod} 
                            onChange={handleInputChange}/>
                </label>

                <button
                    className="bg-green-400"
                    type="button"
                    onClick={handleCreateVolumen}>
                        Agregar Concepto
                </button>

            </form>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Unidad</th>
                        <th>Concepto</th>
                        <th>Estado</th>
                        <th>Cantidad Contratada</th>
                        <th>Precio $ </th>
                        <th>Importe de Contratado</th>
                        <th>Cantidad Ejecutada</th>
                        <th>Importe de Ejecutado</th>
                        <th>Diferencia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {volumen.map((vol) => (
                        <tr key={vol.id}>
                            <td>{vol.id}</td>
                            <td>{vol.codigo}</td>
                            <td>{vol.unidad}</td>
                            <td>{vol.concepto}</td>
                            <td>{vol.estado}</td>
                            <td>{vol.volumen}</td>
                            <td>{vol.precio}</td>
                            <td>{vol.importe}</td>
                            <td>{vol.v_mod}</td>
                            <td>{vol.importe_mod}</td>
                            <td>{vol.diferencia}</td>
                            <td>
                                <button className='bg-orange-400'
                                onClick={() => handleActualizar(id, vol.id)}>
                                    Actualizar
                                </button>
                                <button className='bg-red-600'
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
        <div name="Seccion de Totales de Importes"
            className="grid grid-cols-2 md:grid-cols-2">
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
);

};

export default ControlObra;