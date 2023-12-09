import React, { useState, useEffect } from 'react';
import Button from '../../Button';
import { listObra } from '../../../api/ApiManagment';

export function ObraList () {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const obrasData = await listObra();
        setObras(obrasData);
      } catch (error) {
        console.error('Error al obtener la lista de obras: ', error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="bg-blue p-8 mx-10 my-10 shadow-2xl rounded-md text-white justify-center">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Lista de Obras Registradas</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Localidad</th>
              <th>Municipio</th>
              <th>Dependencia</th>
              <th>Presupuesto</th>
              <th>Editar</th>
              <th>Eliminar</th>
              <th>Detalles</th>
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
              <td>{obra.p_inicial}</td>
              <td className='mx-2'>
                <Button color="orange" text="Editar"/>
              </td>
              <td>
              <Button color="red" text="Eliminar"/>
              </td>
              <td>
              <Button color="gold" text="Detalles"/>
              </td>
            </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ObraList;