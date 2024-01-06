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

return (
<div>
    <h1>Lista de Obras</h1>


        <button
        className='hover:bg-green-600 rounded-full bg-yellow-600 py-2 px-4 mb-4 ml-4 mr-4' onClick={handleCreateObra}>
            Registrar Nueva Obra
        </button>


    <table className='table-fixed'>
    <thead>
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Localidad</th>
        <th>Municipio</th>
        <th>Dependencia</th>
        <th>Fecha Registrado</th>
        <th>Presupuesto</th>
        <th>Ver detalles</th>
        <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {obras.map((obra) => (
        <tr key={obra.id}>
            <td>{obra.id}</td>
            <td>{obra.nombre}</td>
            <td>{obra.localidad}</td>
            <td>{obra.municipio}</td>
            <td>{obra.dependencia}</td>
            <td>{obra.fecha}</td>
            <td>{obra.p_inicial}</td>
            <td> 
                <button className='bg-red-300'
                onClick={() => handleDetalles(obra.id)}>
                    Detalles
                </button>
            </td>
            <td>
                <button className='bg-orange-400'
                onClick={() => handleActualizar(obra.id)}>
                    Actualizar
                </button>
                <button className='bg-red-600'
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
);
};

export default ListObra;
