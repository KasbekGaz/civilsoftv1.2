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
    <div>
        <h1>Registrar Nuevo Proveedor</h1>
        <button 
            className="bg-green-400 py-2 px-4 m-4"
            onClick={handleBack}>
            Regresar
        </button>

        <form className="flex flex-col justify-center items-center">
            <label className="mb-4">
                    Nombre Comercial:
                    <input 
                        type="text"
                        name="nombre_comercial"
                        value={provData.nombre_comercial}
                        onChange={handleInputChange}
                        className="ml-4"
                    />
            </label>
            <label className="mb-4">
                    Razón Social:
                    <input 
                        type="text"
                        name="razon_social"
                        value={provData.razon_social}
                        onChange={handleInputChange}
                        className="ml-4"
                    />
            </label>
            <label className="mb-4">
                    Télefono:
                    <input 
                        type="number"
                        name="telefono"
                        value={provData.telefono}
                        onChange={handleInputChange}
                        className="ml-4"
                    />
            </label>
            <label className="mb-4">
                    Correo:
                    <input 
                        type="text"
                        name="correo"
                        value={provData.correo}
                        onChange={handleInputChange}
                        className="ml-4"
                    />
            </label>
            <label className="mb-4">
                    RFC:
                    <input 
                        type="text"
                        name="coderfc"
                        value={provData.coderfc}
                        onChange={handleInputChange}
                        className="ml-4"
                    />
            </label>
            <label className="mb-4">
                    Descripcion:
                    <input 
                        type="text"
                        name="descripcion"
                        value={provData.descripcion}
                        onChange={handleInputChange}
                        className="ml-4"
                    />
            </label>
            <button 
                className="bg-green-400"
                type="button"
                onClick={handleCreateProv}>
                Agregar
            </button>
        </form>
    </div>
);
};

export default RegisterProv;