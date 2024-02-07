import React, { useEffect, useState } from 'react';
import APIbackend from '../api/APIbackend';
import { useNavigate } from 'react-router-dom';


const ListObra = () => {
    const [obras, setObras] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchObras();
    }, []);

    const fetchObras = async () => {
        try {
        const obrasData = await APIbackend.listObra();
        setObras(obrasData);
        } catch (error) {
        console.error('Error al obtener la lista de obras:', error.message);
        }
    };

    const handleDetalles = (obraId) =>{
        navigate(`/details-obra/${obraId}`)
    }

    const handleActualizar = (obraId) => {
        navigate(`/update-obra/${obraId}`);
    }

    const handleEliminar = async (obraId) => {
        try {
            await APIbackend.deleteObra(obraId);
            alert('Obra Eliminada');
            fetchObras(); // actualizamos la lista de obras
        } catch (error) {
            console.error('Error al eliminar la obra:', error.message);
            
        }
    };

    const handleCreateObra = () =>{
        navigate('/create-obra');
    };

    //! Buscador de Obras:
    const [searchTerm, setSearchTerm] = useState('');
    const filteredObra = obras.filter((obra) =>
        obra.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obra.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

return (
<div>
    <h1
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >Lista de Obras</h1>


        <button
        className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-yellow-700" onClick={handleCreateObra}>
            Registrar Nueva Obra
        </button>

    <div className="relative overflow-x-auto">

        <div className="my-2">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                    </div>

                    <input
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder="Buscar por Nombre de la Obra o por ID"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
        </div>

        <table className="w-full text-left rtl:text-right text-white">
            <thead className="text-sm text-white uppercase">
                <tr className="bg-gray-800 border-b">
                <th scope="col" className="px-6 py-3 text-center rounded-s-2xl">ID</th>
                <th scope="col" className="px-6 py-3 text-center">Nombre</th>
                <th scope="col" className="px-6 py-3 text-center">Localidad</th>
                <th scope="col" className="px-6 py-3 text-center">Municipio</th>
                <th scope="col" className="px-6 py-3 text-center">Dependencia</th>
                <th scope="col" className="px-6 py-3 text-center">Fecha Registrado</th>
                <th scope="col" className="px-6 py-3 text-center">Presupuesto</th>
                <th scope="col" className="px-6 py-3 text-center">Ver detalles</th>
                <th scope="col" className="px-6 py-3 text-center rounded-e-2xl">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {filteredObra.map((obra) => (
                <tr className="bg-gray-600 border-b" key={obra.id}>
                    <td scope="row" className="px-4 py-2 text-white text-center text-base font-semibold">{obra.id}</td>
                    <td scope="row" className="px-4 py-2 text-white text-right text-base font-semibold" >{obra.nombre}</td>
                    <td scope="row" className="px-4 py-2 text-white text-right text-base font-semibold" >{obra.localidad}</td>
                    <td scope="row" className="px-4 py-2 text-white text-right text-base font-semibold" >{obra.municipio}</td>
                    <td scope="row" className="px-4 py-2 text-white text-right text-base font-semibold" >{obra.dependencia}</td>
                    <td scope="row" className="px-4 py-2 text-white text-justify text-base font-semibold">{obra.fecha}</td>
                    <td scope="row" className="px-4 py-2 text-white text-justify text-base font-semibold">{obra.p_inicial}</td>
                    <td> 
                        <button className="text-center font-semibold rounded-full bg-fuchsia-500 py-2 px-4 mb-4 mt-4 hover:bg-fuchsia-600"
                        onClick={() => handleDetalles(obra.id)}>
                            Detalles
                        </button>
                    </td>
                    <td>
                        <button className="text-center font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                        onClick={() => handleActualizar(obra.id)}>
                            Actualizar
                        </button>
                        <button className="text-center font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
                        onClick={() => handleEliminar(obra.id) }
                            >
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

export default ListObra;
