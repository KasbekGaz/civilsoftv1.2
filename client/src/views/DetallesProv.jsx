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
    //* Manejo de errores en formulario en material
    const [errors, setErrors] = useState({
        unidad: false,
        material: false,
        precio: false,
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
    //* Manejo de errores en formulario en banca
    const [errors2, setErrors2] = useState({
        banco: false,
        clave_banco: false,
        cuenta_banco: false,
    })
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
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };
    const createMaterial = async () =>{
        //* Validar si algún campo está vacío
        const newErrors = {};
        let hasError = false;
        Object.entries(materialData).forEach(([key, value]) => {
            if (value === '') {
                newErrors[key] = true;
                hasError = true;
            }
        });
        if (hasError) {
            setErrors(newErrors);
            return;
        }

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
            alert('!Compruebe que todos los campos estan completos!');
        }
    };
    //! Agregar Banca a un proveedor
    const handleInputChangeBanca = (e) =>{
        const { name, value } = e.target;
        setBancaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        //*limpiar mensaje de error
        setErrors2((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };
    const createBanca = async () =>{
        // Validar si algún campo está vacío
        const newErrors = {};
        let hasError = false;
        Object.entries(infobanca).forEach(([key, value]) => {
            if (value === '') {
                newErrors[key] = true;
                hasError = true;
            }
        });
        if (hasError) {
            setErrors2(newErrors);
            return;
        }

        try{
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
        }catch(error){
            console.error('Error al agregar el material');
            alert('!Compruebe que todos los campos estan completos!');
        }
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
//! cargar ls peticiones
useEffect(() =>{
    fetchProvDetails();
    fetchMaterial();
    fetchBanca();
}, [id]);
return(
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" container mx-5 my-8  bg-indigo-950 rounded-2xl drop-shadow-xl border border-black">
            <h1> Detalles del Proveedor: </h1>
                <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"
                    onClick={handleBack} >
                    Regresar
                </button>
        <div className="my-2 items-center text-center">
            <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl"> {provData.nombre_comercial} </h3>
            </label>
            <h3 className="block my-2 font-medium">
                Razon Social:
            </h3>
            <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl"> {provData.razon_social} </h3>
            </label>
            <h3 className="block my-2 font-medium">
                Número:
            </h3>
            <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl"> {provData.telefono} </h3>
            </label>
            <h3 className="block my-2 font-medium">
                Correo:
            </h3>
            <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl"> {provData.correo} </h3>
            </label>
            <h3 className="block my-2 font-medium">
                RFC:
            </h3>
            <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl"> {provData.coderfc} </h3>
            </label>
            <h3 className="block my-2 font-medium">
                Descripcion:
            </h3>
            <label className="bg-gray-400 border border-gray-300  text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-xl"> {provData.descripcion} </h3>
            </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="flex-auto bg-indigo-950 border border-black drop-shadow-xl rounded-2xl p-4">

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
                            {errors.unidad && <p className="text-red-600">Este campo es requerido!</p> }
                    </label>
                    <label className="block my-2 font-medium">
                        Material:
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="material"
                            value={materialData.material}
                            onChange={handleInputChange} />
                            {errors.material && <p className="text-red-600">Este campo es requerido!</p> }
                    </label>
                    <label className="block my-2 font-medium">
                        Precio:
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="precio"
                            placeholder="$00.0"
                            value={materialData.precio}
                            onChange={handleInputChange} />
                            {errors.precio && <p className="text-red-600">Este campo es requerido!</p> }
                    </label>
                </form>
                <button 
                    className=" text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                    type="button"
                    onClick={createMaterial}>
                    Agregar Material
                </button>


            </div>

            <div className="w-full p-4  bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Tabla Materiales</h1>
                <div className="overflow-auto mt-2">
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
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.id}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.unidad}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.material}</td>
                                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.precio}</td>
                                    <td scope="row" className="px-4 py-2 flex space-x-1 justify-items-center">
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
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="flex-auto bg-indigo-950 border border-black drop-shadow-xl rounded-2xl p-4">
                    
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Agregar Informacion Bancaria</h1>

                    <form className="flex flex-col justify-center items-center">
                    <label className="block my-2 font-medium">
                            Nombre del Banco:
                            <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="banco"
                                value={infobanca.banco}
                                onChange={handleInputChangeBanca} />
                                {errors2.banco && <p className="text-red-600">Este campo es requerido!</p> }
                        </label>
                        <label className="block my-2 font-medium">
                            Clave del Banco:
                            <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="clave_banco"
                                value={infobanca.clave_banco}
                                onChange={handleInputChangeBanca} />
                                {errors2.clave_banco && <p className="text-red-600">Este campo es requerido!</p> }
                        </label>
                        <label className="block my-2 font-medium">
                            Cuenta de Banco:
                            <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="cuenta_banco"
                                value={infobanca.cuenta_banco}
                                onChange={handleInputChangeBanca} />
                                {errors2.cuenta_banco && <p className="text-red-600">Este campo es requerido!</p> }
                        </label>

                        <button 
                        className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        type="button"
                        onClick={createBanca}>
                        Agregar Informacion Bancaria
                        </button>

                    </form>
                </div>

                <div className="w-full p-4  bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
                    <h1  className="text-2xl font-semibold tracking-tight text-white sm:text-2xl">Tabla Informacion Bancaria</h1>
                    <div className="overflow-auto mt-2">
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
                                        <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{b.id}</td>
                                        <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{b.banco}</td>
                                        <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{b.cuenta_banco}</td>
                                        <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{b.clave_banco}</td>
                                        <td scope="row" className="px-4 py-2 flex space-x-1 justify-items-center">
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
        </div>
    </div>
);
};

export default DetallesProv;