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
    //*Manejo de errores formulario
    const [errors, setErrors] = useState({
        nombre_comercial: false,
        razon_social: false,
        telefono: false,
        correo: false,
        coderfc: false,
        descripcion: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProvData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        //* Limpiar mensaje de error
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    const handleCreateProv = async () =>{
        //* Validar si algún campo está vacío
        const newErrors = {};
        let hasError = false;
        Object.entries(provData).forEach(([key, value]) => {
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
            console.log(provData);
            const response = await APIbackend.createP(provData);
            console.log('datos:', response);
            alert('Proveedor agregado correctamente');
            navigate('/control-proveedores');

        }catch(error){
            console.error('Error al agregar el proveedor', error.message);
            alert('!Por favor revise si todos los datos estan completos!');
        }
    };

    const handleBack = () =>{
        navigate('/control-proveedores');
    };

return(
    <div className=" container mx-4 my-4 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg drop-shadow-xl">
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
                    {errors.nombre_comercial && <p className="text-red-600">Este campo es requerido!</p> }
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
                    {errors.razon_social && <p className="text-red-600">Este campo es requerido!</p> }
            </label>
            <label className="block my-2 font-medium">
                    Télefono:
                    <input 
                        type="number"
                        name="telefono"
                        value={provData.telefono}
                        onChange={handleInputChange}
                        placeholder="Maximo 15 caracteres"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.telefono && <p className="text-red-600">Este campo es requerido!</p> }
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
                    {errors.correo && <p className="text-red-600">Este campo es requerido!</p> }
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
                    {errors.coderfc && <p className="text-red-600">Este campo es requerido!</p> }
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
                    {errors.descripcion && <p className="text-red-600">Este campo es requerido!</p> }
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

export default RegisterProv