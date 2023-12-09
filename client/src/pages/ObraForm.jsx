import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from "react-router-dom";
import  ObraList  from "../components/forms/obra/ObraList";
import Button from '../components/Button';


function ObraForm  () {
    //const navigate = useNavigate();


  const [obraData, setObraData] = useState({
    nombre: '',
    localidad: '',
    municipio: '',
    dependencia: '',
    fecha: '',
    p_inicial: 0,
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObraData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama a la función de creación de obra del backend
      const response = await createObra(obraData);
      console.log('Obra creada con éxito:', response);

      // Puedes agregar aquí la lógica de redirección si es necesario
      //navigate('/ruta-de-redireccion');

    } catch (error) {
      console.error('Error al crear obra: ', error.message);
      // Actualiza el estado de error para mostrar un mensaje al usuario
      setError('Error al crear obra. Verifica los datos ingresados.');
    }
  };


  return (
    <div className='justify-center shadow-md rounded-md'>
      <div className="bg-blue p-8 mx-10 my-10 shadow-md rounded-md text-white justify-center">
        <h2 className="text-2xl font-semibold mb-4">Registro de Nueva Obra</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={obraData.nombre}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mt-1 text-white bg-sky-950"
            />
          </label>
          <br />
          <label className="block mb-2">
            Localidad:
            <input
              type="text"
              name="localidad"
              value={obraData.localidad}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mt-1 text-white bg-sky-950"
            />
          </label>
          <br />
          <label className="block mb-2">
            Municipio:
            <input
              type="text"
              name="municipio"
              value={obraData.municipio}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mt-1 text-white bg-sky-950"
            />
          </label>
          <br />
          <label className="block mb-2">
            Dependencia:
            <input
              type="text"
              name="dependencia"
              value={obraData.dependencia}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mt-1 text-white bg-sky-950"
            />
          </label>
          <br />
          <label className="block mb-2">
            Fecha:
            <input
              type="date"
              name="fecha"
              value={obraData.fecha}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mt-1 text-white bg-sky-950"
            />
          </label>
          <br />
          <label className="block mb-2">
            Presupuesto Inicial:
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-white bg-sky-950 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="p_inicial"
                value={obraData.p_inicial}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white bg-sky-950 ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </label>
            <Button type="submit" color="green" text="Registrar" />
        </form>
      </div>
    </div>

  );
};

export default ObraForm;


