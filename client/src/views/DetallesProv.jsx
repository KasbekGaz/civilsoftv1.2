import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";




const DetallesProv = () =>{
    const { id } = useParams();
    const [ provData, setProvData ] = useState({});
    const navigate = useNavigate();
    //* Pa la tabla Materiales
    const [ material, setMateriales] = useState([]);
    //* pa la tabla Banca
    const [ banca, setBanca ] = useState([]);

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
        <div className="Materiales">
            <button className="bg-green-400 py-2 px-4 mb-4 rounded-full">
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
                                <button>
                                    Editar
                                </button>
                                <button>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="Banca">
            <button className="bg-green-400 py-2 px-4 mb-4 rounded-full">
                Agregar Informacion Bancaria
            </button>

        </div>
    </div>
);
};

export default DetallesProv;