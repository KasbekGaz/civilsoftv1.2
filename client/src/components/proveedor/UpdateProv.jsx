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
    <div>
        <h1> Actualizar Proveedor </h1>
        <button
            className="bg-green-400 py-2 px-4 m-4"
            onClick={handleBack}
            >
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
                onClick={handleUpdateProv}>
                Actualizar Proveedor
            </button>
        </form>

    </div>
);

};

export default UpdateProv;