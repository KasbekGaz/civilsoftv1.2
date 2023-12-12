import React, { useEffect, useState } from 'react';
import APIbackend from '../api/APIbackend';
import { Link } from 'react-router-dom';
import ObraForm from './ObraForm';

const ListObra = () => {
    const [obras, setObras] = useState([]);

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
            
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
};

export default ListObra;
