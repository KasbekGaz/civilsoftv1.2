import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIbackend from "../../api/APIbackend";


const RegisterProv = () =>{
    const navigate = useNavigate();

    const [ provData, setProvData ] = useState({
        nombre_comercial: '',
        razon_social: '',
        telefono: '',
        correo: '',
        coderfc: '',
        descripcion: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProvData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateProv = async () =>{
        try{
            console.log(provData);
            const response = await APIbackend.createP(provData);
            console.log('datos:', response);
            alert('Proveedor agregado correctamente');
            navigate('/control-proveedores');

        }catch(error){
            console.error('Error al agregar el proveedor', error.message);
        }
    };

    const handleBack = () =>{
        navigate('/control-proveedores');
    };
return(
    <div className=" container mx-4 my-4 max-w-sm p-6 bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Registrar Nuevo Proveedor</h2>

        <button  className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"
            onClick={handleBack} >
            Regresar
        </button>

        <form className="flex flex-col justify-center items-center">
            <label className="block my-2 font-medium">
                    Nombre Comercial:
                    <input 
                        type="text"
                        name="nombre_comercial"
                        value={provData.nombre_comercial}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
            </label>
            <label className="block my-2 font-medium">
                    Razón Social:
                    <input 
                        type="text"
                        name="razon_social"
                        value={provData.razon_social}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
            </label>
            <label className="block my-2 font-medium">
                    Télefono:
                    <input 
                        type="number"
                        name="telefono"
                        value={provData.telefono}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
            </label>
            <label className="block my-2 font-medium">
                    Correo:
                    <input 
                        type="text"
                        name="correo"
                        value={provData.correo}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
            </label>
            <label className="block my-2 font-medium">
                    RFC:
                    <input 
                        type="text"
                        name="coderfc"
                        value={provData.coderfc}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
            </label>
            <label className="block my-2 font-medium">
                    Descripcion:
                    <input 
                        type="text"
                        name="descripcion"
                        value={provData.descripcion}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
            </label>
            <button 
                className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                type="button"
                onClick={handleCreateProv}>
                Agregar
            </button>
        </form>
    </div>
);
};

export default RegisterProv;