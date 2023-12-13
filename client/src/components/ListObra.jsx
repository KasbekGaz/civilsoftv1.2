import React, { useEffect, useState } from 'react';
import APIbackend from '../api/APIbackend';
import { Link, useNavigate } from 'react-router-dom';


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

    const handleDetalles = (obraId, obraNombre) =>{
        navigate(`/details-obra/${obraId}/${encodeURIComponent(obraNombre)}`)
    }

    const handleActualizar = (obraId) => {
        navigate(`/update-obra/${obraId}`);
    }

    const handleEliminar = async (obraId) => {
        try {
            await APIbackend.deleteObra(obraId);
            
            fetchObras(); // actualizamos la lista de obras


        } catch (error) {
            console.error('Error al eliminar la obra:', error.message);
            
        }
    };

return (
<div>
    <h2>Lista de Obras</h2>

    <Link to="/create-obra" >
        <button
        className='bg-yellow-600'
        >Registrar Nueva Obra</button>
    </Link>


    <table>
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
                onClick={() => handleDetalles(obra.id, obra.nombre)}>
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
