import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";




const DetallesProv = () => {
    const { id } = useParams();
    const [ provData, setProvData ] = useState({});
    const navigate = useNavigate();
    //! formulario materiales
    const [ materialData, setMdata ] = useState({
        proveedor: id,
        unidad: '',
        material: '',
        precio: '',
    });
    //* Pa la tabla Materiales
    const [ material, setMateriales] = useState([]);
    //! formulario Banca
    const [ infobanca, setBancaData ] = useState({
        proveedor: id,
        banco: '',
        clave_banco: '',
        cuenta_banco: '',
    });
    //* pa la tabla Banca
    const [ banca, setBanca ] = useState([]);

//! obetener datos del proveedor por su id
    const fetchProvDetails = async () =>{
        try{
            console.log(id);
            const provData = await APIbackend.getProveedorById(id);
            setProvData(provData);
            console.log('Proveedor', provData);
        }catch(error){
            console.error('Error al obterner datos', error.message);
        }
    }; 
//! cargar ls peticiones
    useEffect(() =>{
        fetchProvDetails();
        fetchMaterial();
        fetchBanca();
    }, [id]);

    const handleBack = () =>{
        navigate('/control-proveedores');
    };
//! Listar materiales del proveedor
    const fetchMaterial = async () =>{
        try{
            console.log(id); //* prov_id
            const materialData = await APIbackend.listMaterial(id);
            setMateriales(materialData);
            console.log('Materiales', materialData);
        }catch(error){
            console.error('Error al listar materiales', error.message);
        }
    };
    //! Listar Banca del proveedor
    const fetchBanca = async () =>{
        try{
            console.log(id); //* prov_id
            const bancaData = await APIbackend.listBanca(id);
            setBanca(bancaData);
            console.log('Banca', bancaData);
        }catch(error){
            console.error('Error al listar materiales', error.message);
        }
    };
    //! Agregar un material a un proveedor
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setMdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const createMaterial = async () =>{
        try{
            console.log(id,materialData);
            const response = await APIbackend.createMaterial(id, materialData);
            console.log('datos material creado', response);
            alert('Se Agrego el material correctamente !!');

            //* limpiamos formulario
            setMdata({
                proveedor: id,
                unidad: '',
                material: '',
                precio: '',
            });

            fetchMaterial();

        }catch(error){
            console.error('Error al agregar el material');
        }
    };
    //! Agregar Banca a un proveedor
    const handleInputChangeBanca = (e) =>{
        const { name, value } = e.target;
        setBancaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const createBanca = async () =>{
        console.log(id,infobanca);
            const response = await APIbackend.createBanca(id, infobanca);
            console.log('datos banca creado', response);
            alert('Se Agrego la informacion correctamente !!');

            //* limpiamos formulario
            setBancaData({
                proveedor: id,
                banco: '',
                clave_banco: '',
                cuenta_banco: '',
            });
            
            fetchBanca();
    };
    //! Editar un material
    const editarMaterial = (id, mId) =>{
        console.log('Id de material',id, mId);
        navigate(`/update-material-by-obra/${id}/${mId}`);
    };
    //! Editar Banca
    const editarBanca = (id, bId) =>{
        console.log('Id de banca',id, bId);
        navigate(`/update-banca-by-obra/${id}/${bId}`);
    };
    //! Eliminar material
    const eliminarMaterial = async (id,mId) =>{
        try{
            console.log('Datos que entran: ', id, mId);
            await APIbackend.deleteMaterial(id,mId);
            alert('Eliminaste el material con exito !!');
            fetchMaterial();
        }catch(error){
            console.log('Error al eliminar el material', error.message);
        }
    };
    //! Eliminar Banca
    const eliminarBanca = async (id,mId) =>{
        try{
            console.log('Datos que entran: ', id, mId);
            await APIbackend.deleteBanca(id,mId);
            alert('Eliminaste la informacion con exito !!');
            fetchBanca();
        }catch(error){
            console.log('Error al eliminar la banca', error.message);
        }
    };

return(
    <div>
        <h1> Detalles del Proveedor: </h1>
            <button className="bg-green-400 py-2 px-2 mb-4"
                onClick={handleBack} >
                Regresar
            </button>
        <div className="Proveedor">
            <h1> {provData.nombre_comercial} </h1>
            <h2> Razón Social: {provData.razon_social} </h2>
            <h2> Télefono: {provData.telefono} </h2>
            <h2> Correo: {provData.correo} </h2>
            <h2> RFC: {provData.coderfc} </h2>
            <h2> Descripción: {provData.descripcion} </h2>
        </div>
        <div className="">
            <h1>Agregar Materiales ofertados por el Proveedor</h1>
            <form className="flex flex-col justify-center items-center">
                <label className="mb-4">
                    Unidad:
                    <input 
                        className="ml-4"
                        type="text"
                        name="unidad"
                        value={materialData.unidad}
                        onChange={handleInputChange} />
                </label>
                <label className="mb-4">
                    Material:
                    <input 
                        className="ml-4"
                        type="text"
                        name="material"
                        value={materialData.material}
                        onChange={handleInputChange} />
                </label>
                <label className="mb-4">
                    Precio:
                    <input 
                        className="ml-4"
                        type="number"
                        name="precio"
                        value={materialData.precio}
                        onChange={handleInputChange} />
                </label>
            </form>
            <button 
                className="bg-green-400 py-2 px-4 mb-4 rounded-full"
                onClick={createMaterial}>
                Agregar Material
            </button>
            <table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Unidad </th>
                        <th> Material </th>
                        <th> Precio $ </th>
                        <th> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {material.map((m) => (
                        <tr key={m.id} >
                            <td>{m.id}</td>
                            <td>{m.unidad}</td>
                            <td>{m.material}</td>
                            <td>{m.precio}</td>
                            <td>
                                <button 
                                    className="bg-orange-400 m-2 rounded-full py-2 px-3"
                                    onClick={() => editarMaterial(id, m.id)}>
                                    Editar
                                </button>
                                <button 
                                    className="bg-red-600 m-2 rounded-full py-2 px-3"
                                    onClick={() => eliminarMaterial(id, m.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="Banca">
            <h1>Agregar Informacion Bancaria</h1>
            <form className="flex flex-col justify-center items-center">
            <label className="mb-4">
                    Nombre del Banco:
                    <input 
                        className="ml-4"
                        type="text"
                        name="banco"
                        value={infobanca.banco}
                        onChange={handleInputChangeBanca} />
                </label>
                <label className="mb-4">
                    Clave del Banco:
                    <input 
                        className="ml-4"
                        type="text"
                        name="clave_banco"
                        value={infobanca.clave_banco}
                        onChange={handleInputChangeBanca} />
                </label>
                <label className="mb-4">
                    Cuenta de Banco:
                    <input 
                        className="ml-4"
                        type="text"
                        name="cuenta_banco"
                        value={infobanca.cuenta_banco}
                        onChange={handleInputChangeBanca} />
                </label>
            </form>
            <button 
                className="bg-green-400 py-2 px-4 mb-4 rounded-full"
                onClick={createBanca}>
                Agregar Informacion Bancaria
            </button>

            <table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Banco </th>
                        <th> Cuenta de Banco </th>
                        <th> Clave de banco </th>
                        <th> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {banca.map((b) => (
                        <tr key={b.id} >
                            <td>{b.id}</td>
                            <td>{b.banco}</td>
                            <td>{b.cuenta_banco}</td>
                            <td>{b.clave_banco}</td>
                            <td>
                                <button 
                                    className="bg-orange-400 m-2 rounded-full py-2 px-3"
                                    onClick={() => editarBanca(id, b.id)}>
                                    Editar
                                </button>
                                <button 
                                    className="bg-red-600 m-2 rounded-full py-2 px-3"
                                    onClick={() => eliminarBanca(id, b.id)}>
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

export default DetallesProv;