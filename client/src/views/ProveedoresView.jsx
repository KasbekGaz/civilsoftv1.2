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
            fetchMaterial();
        }catch(error){
            console.error('Error al eliminar el proveedor:', error.message);
        }
    };

return(
    <div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">Control de Proveedores</h1>
        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" onClick={handleBack}>
            Regresa
        </button>

        <div className="items-center">

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-2xl">Lista de Materiales Ofertados: </h1>

            <div className="my-2">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id="search"
                    value={searchTerm}
                    placeholder="Buscar por Material"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                    />
                </div>
            </div>

                <table className="w-full text-left rtl:text-right text-white">
                    <thead className="text-sm text-white uppercase">
                        <tr className="bg-gray-800 border-b">
                            <th scope="col" className="px-6 py-3 text-center rounded-s-2xl">ID</th>
                            <th scope="col" className="px-6 py-3 text-center">Unidad</th>
                            <th scope="col" className="px-6 py-3 text-center">Material</th>
                            <th scope="col" className="px-6 py-3 text-center">Precio</th>
                            <th scope="col" className="px-6 py-3 text-center rounded-e-2xl">Proveedor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredMaterial.map((m) => (
                        <tr className="bg-gray-600 border-b" key={m.id}>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.id}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.unidad}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.material}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.precio}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{m.proveedor_nombre_comercial}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>


        <div>
            <h1 className="text-2xl mt-4 font-bold tracking-tight text-white sm:text-2xl"> Lista de Proveedores</h1>
            <button 
                className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-yellow-700"
                onClick={CreateProveedor}>
                Registar Nuevo Proveedor
            </button>

            <div className="my-2">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                    </div>

                    <input
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder="Buscar por Nombre Comercial"
                    id="search"
                    value={searchTermP}
                    onChange={(e) => setSearchTermP(e.target.value)}
                    />
                </div>
            </div>

            <table className="w-full text-left rtl:text-right text-white">
                <thead className="text-sm text-white uppercase">
                    <tr className="bg-gray-800 border-b">
                        <th scope="col" className="px-6 py-3 text-center rounded-s-2xl"> ID</th>
                        <th scope="col" className="px-6 py-3 text-center">Nombre Comercial</th>
                        <th scope="col" className="px-6 py-3 text-center">Razón Social</th>
                        <th scope="col" className="px-6 py-3 text-center">Telefono</th>
                        <th scope="col" className="px-6 py-3 text-center">Correo</th>
                        <th scope="col" className="px-6 py-3 text-center">RFC</th>
                        <th  scope="col" className="px-6 py-3 text-center rounded-e-2xl">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProv.map((prove) => (
                        <tr className="bg-gray-600 border-b" key={prove.id}>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{prove.id}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{prove.nombre_comercial}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{prove.razon_social}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{prove.telefono}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{prove.correo}</td>
                            <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{prove.coderfc}</td>
                            <td scope="row">
                                <button 
                                    className="text-center font-semibold rounded-full bg-fuchsia-500 py-2 px-4 mb-4 mt-4 hover:bg-fuchsia-600"
                                    onClick={() => detalles(prove.id)}>
                                        Detalles
                                    </button>
                                <button
                                    className="text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                    onClick={() => editar(prove.id)}>
                                    Editar
                                </button>
                                <button
                                    className="text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
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