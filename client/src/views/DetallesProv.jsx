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
            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"s
                onClick={handleBack} >
                Regresar
            </button>
        <div className="Proveedor">
            <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-3xl"> {provData.nombre_comercial} </h1>
            </label>
            <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> {provData.razon_social} </h1>
            </label>
            <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> {provData.telefono} </h1>
            </label>
            <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> {provData.correo} </h1>
            </label>
            <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> {provData.coderfc} </h1>
            </label>
            <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> {provData.descripcion} </h1>
            </label>
        </div>

        <div className="grid grid-cols-2 gap-8 mx-auto max-w-4xl">

            <div className="w-full flex-auto border border-violet-600 drop-shadow-xl rounded-2xl">

                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Agregar Materiales ofertados por el Proveedor</h1>

                <form className="flex flex-col justify-center items-center">
                    <label className="block my-2 font-medium">
                        Unidad:
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="text"
                            name="unidad"
                            value={materialData.unidad}
                            onChange={handleInputChange} />
                    </label>
                    <label className="block my-2 font-medium">
                        Material:
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="material"
                            value={materialData.material}
                            onChange={handleInputChange} />
                    </label>
                    <label className="block my-2 font-medium">
                        Precio:
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="precio"
                            value={materialData.precio}
                            onChange={handleInputChange} />
                    </label>
                </form>
                <button 
                    className=" text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                    onClick={createMaterial}>
                    Agregar Material
                </button>


            </div>

            <div className="w-full drop-shadow-xl">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Tabla Materiales</h1>
                <table className="w-full text-left rtl:text-right text-white">
                    <thead className="text-sm text-white uppercase">
                        <tr className="bg-gray-800 border-b">
                            <th scope="col" className="px-6 py-3 text-center rounded-s-2xl"> ID </th>
                            <th scope="col" className="px-6 py-3 text-center"> Unidad </th>
                            <th scope="col" className="px-6 py-3 text-center"> Material </th>
                            <th scope="col" className="px-6 py-3 text-center"> Precio $ </th>
                            <th scope="col" className="px-6 py-3 text-center rounded-e-2xl"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        {material.map((m) => (
                            <tr className="bg-gray-600 border-b" key={m.id} >
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{m.id}</td>
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{m.unidad}</td>
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{m.material}</td>
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{m.precio}</td>
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">
                                    <button 
                                        className="text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                        onClick={() => editarMaterial(id, m.id)}>
                                        Editar
                                    </button>
                                    <button 
                                        className="text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
                                        onClick={() => eliminarMaterial(id, m.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mx-auto max-w-4xl">

            <div className="w-full flex-auto border border-violet-600 drop-shadow-xl rounded-2xl">
                
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Agregar Informacion Bancaria</h1>

                <form className="flex flex-col justify-center items-center">
                <label className="block my-2 font-medium">
                        Nombre del Banco:
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="banco"
                            value={infobanca.banco}
                            onChange={handleInputChangeBanca} />
                    </label>
                    <label className="block my-2 font-medium">
                        Clave del Banco:
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="clave_banco"
                            value={infobanca.clave_banco}
                            onChange={handleInputChangeBanca} />
                    </label>
                    <label className="block my-2 font-medium">
                        Cuenta de Banco:
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="cuenta_banco"
                            value={infobanca.cuenta_banco}
                            onChange={handleInputChangeBanca} />
                    </label>
                </form>

                <button 
                    className=" text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                    onClick={createBanca}>
                    Agregar Informacion Bancaria
                </button>
            </div>

            <div className="w-full drop-shadow-xl">
                <h1  className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Tabla Informacion Bancaria</h1>
                <table className="w-full text-left rtl:text-right text-white">
                    <thead className="text-sm text-white uppercase">
                        <tr  className="bg-gray-800 border-b">
                            <th scope="col" className="px-6 py-3 text-center rounded-s-2xl"> ID </th>
                            <th scope="col" className="px-6 py-3 text-center"> Banco </th>
                            <th scope="col" className="px-6 py-3 text-center"> Cuenta de Banco </th>
                            <th scope="col" className="px-6 py-3 text-center"> Clave de banco </th>
                            <th scope="col" className="px-6 py-3 text-center rounded-e-2xl"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        {banca.map((b) => (
                            <tr className="bg-gray-600 border-b" key={b.id} >
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{b.id}</td>
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{b.banco}</td>
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{b.cuenta_banco}</td>
                                <td scope="row" class="px-4 py-2 text-white text-center text-base font-semibold">{b.clave_banco}</td>
                                <td>
                                    <button 
                                        className="text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                        onClick={() => editarBanca(id, b.id)}>
                                        Editar
                                    </button>
                                    <button 
                                        className="text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
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
    </div>
);
};

export default DetallesProv;