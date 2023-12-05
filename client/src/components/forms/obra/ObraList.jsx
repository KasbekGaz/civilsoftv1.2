import React, { useState, useEffect } from 'react';
import Button from '../../Button';
import { listObra } from '../../../api/ApiManagment';

export function ObraList () {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObras = async () => {
      try {

        const token = localStorage.getItem('loggedToken');
        console.log('Token almacenado: ', token);

        const response = await listObra();
        setObras(response.data);
        
        console.log(response.data)


      } catch (error) {
        console.error('Error al obtener la lista de obras:', error.response);
        console.log(response.data)

        setError('Error al cargar la lista de obras. Por favor, intenta de nuevo más tarde. Puede que no haya inicidado sesion');
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  if (loading) {
    return <p>Cargando obras...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
            </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ObraList;