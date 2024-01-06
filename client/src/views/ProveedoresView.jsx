import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIbackend from '../api/APIbackend';

const ProveedorsView = () =>{
    const [material, setMateriales] = useState([]);
    const [prov, SetProveedor] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchMaterial();
        fetchProv();
    }, []);

    const handleBack = () => {
        navigate('/dashboard');
    }
//! Listar materiales
    const fetchMaterial = async () => {
        try{
            const materialData = await APIbackend.AllMateriales();
            setMateriales(materialData);
            console.log('Datos obtenidos: ', materialData);
        }catch(error){
            console.error('Error al obtener la lista de materiales', error.message);
        }
    };
     //* Buscador material para tabla materiales
    const [searchTerm, setSearchTerm] = useState('');
    const filteredMaterial = material.filter((m) =>
        m.material.toLowerCase().includes(searchTerm.toLowerCase())
    );
//! Listar proveedores
    const fetchProv = async () =>{
        try{
            const proveedores = await APIbackend.listP();
            SetProveedor(proveedores);
            console.log('Datos obtenidos:', proveedores);
        }catch(error){
            console.error('Error al obtener la lista de proveedores', error.message);
        }
    };
    //* Buscador proveedor para tabla proveedores
    const [searchTermP, setSearchTermP] = useState('');
    const filteredProv = prov.filter((prove) =>
        prove.nombre_comercial.toLowerCase().includes(searchTermP.toLowerCase())
    );
    //! Agregar un proveedor
    const CreateProveedor = () =>{
        navigate('/create-prov');
    };
    //! Detalles de Proveedor
    const detalles = (id) =>{
        navigate(`/details-prov/${id}`);
    };
    //!  Actualizar proveedor
    const editar =  (id) =>{
        navigate(`/update-prov/${id}`);
    };
    //! Eliminar un proveedor
    const eliminar = async (id) =>{
        try{
            await APIbackend.deleteP(id);
            alert('Proveedor Eliminado');
            fetchProv();
        }catch(error){
            console.error('Error al eliminar el proveedor:', error.message);
        }
    };

return(
    <div>
        <h1>Control de Proveedores</h1>
        <button className="bg-green-400 py-2 px-4 mb-4" onClick={handleBack}>
            Regresa
        </button>
        <div>
            <h1>Lista de Materiales Ofertados: </h1>
            <div className="my-2">
                <label htmlFor="search">Buscar por Material: </label>
                <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Unidad</th>
                            <th>Material</th>
                            <th>Precio</th>
                            <th>Proveedor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredMaterial.map((m) => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.unidad}</td>
                            <td>{m.material}</td>
                            <td>{m.precio}</td>
                            <td>{m.proveedor_nombre_comercial}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>


        <div>
            <h1> Lista de Proveedores</h1>
            <button 
                className='hover:bg-green-600 rounded-full bg-yellow-600 py-2 px-4 ml-4 mr-4'
                onClick={CreateProveedor}>
                Registar Nuevo Proveedor
            </button>

            <div className="my-2">
                <label htmlFor="search">Buscar por Nombre Comercial: </label>
                <input
                type="text"
                id="search"
                value={searchTermP}
                onChange={(e) => setSearchTermP(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Comercial</th>
                        <th>Razón Social</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>RFC</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProv.map((prove) => (
                        <tr key={prove.id}>
                            <td>{prove.id}</td>
                            <td>{prove.nombre_comercial}</td>
                            <td>{prove.razon_social}</td>
                            <td>{prove.telefono}</td>
                            <td>{prove.correo}</td>
                            <td>{prove.coderfc}</td>
                            <td>
                                <button 
                                    className='bg-red-300 m-2 rounded-full py-2 px-3'
                                    onClick={() => detalles(prove.id)}>
                                        Detalles
                                    </button>
                                <button
                                    className='bg-orange-400 m-2 rounded-full py-2 px-3'
                                    onClick={() => editar(prove.id)}>
                                    Editar
                                </button>
                                <button
                                    className='bg-red-600 m-2 rounded-full py-2 px-3'
                                    onClick={() => eliminar(prove.id)}>
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

export default ProveedorsView;