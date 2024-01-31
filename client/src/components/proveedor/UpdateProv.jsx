import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../../api/APIbackend";


const UpdateProv = () =>{
    const { id } = useParams();
    const navigate = useNavigate();

    console.log('Id del proveedor:', id);

    const [ provData, setProvData ] = useState({
        nombre_comercial: '',
        razon_social: '',
        telefono: '',
        correo: '',
        coderfc: '',
        descripcion: '',

    });

    useEffect(() => {
        const fetchProvData = async () =>{
            try{
                const prov = await APIbackend.getProveedorById(id);
                setProvData({
                    nombre_comercial: prov.nombre_comercial,
                    razon_social: prov.razon_social,
                    telefono: prov.telefono,
                    correo: prov.correo,
                    coderfc: prov.coderfc,
                    descripcion: prov.descripcion,
                });
            }catch(error){
                console.error('Error al obtener datos del Proveedor:', error.message);
            }
        };

        fetchProvData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProvData({ ...provData, [name]: value });
    };

    const handleUpdateProv = async () =>{
        try{
            console.log(id, provData);
            const response = await APIbackend.updateP(id, provData);
            console.log('datos:', response);
            alert('Proveedor actualizado correctamente');
            navigate('/control-proveedores');
        }catch(error){
            console.error('Error al agregar el proveedor', error.message);
        }
    };

    const handleBack =() =>{
        navigate('/control-proveedores');
    };

return(
    <div className=" container mx-4 my-4 max-w-sm p-6 bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">
        <h1 className="tittext-3xl font-bold tracking-tight text-white sm:text-4xl"> Actualizar Proveedor </h1>

        <button
            className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"
            onClick={handleBack}
            >
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
                    <textarea 
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
                onClick={handleUpdateProv}>
                Actualizar Proveedor
            </button>
        </form>

    </div>
);

};

export default UpdateProv;