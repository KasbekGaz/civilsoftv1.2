import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import APIbackend from '../api/APIbackend';


const ObraForm = () =>{
    const navigate = useNavigate();

    const [obraData, setObraData] = useState({
        nombre: '',
        localidad: '',
        municipio: '',
        dependencia: '',
        fecha: '',
        p_inicial: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObraData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateObra = async () =>{
        try{
            const response = await APIbackend.createObra(obraData);

            console.log('Obra Creada', response);
            alert('Obra creada correctamente');
            navigate('/dashboard');

        }catch(error){
            console.error('Error al crear la obra: ', error.message);
        }
    };

    const handleBack = () =>{
        navigate('/dashboard');
    };

return (
    <div>
        <h1>Registrar Nueva Obra</h1>

        <button className="bg-green-400 py-2 px-4 mb-4" onClick={handleBack}>
            Regresar
        </button>

        <form  className="flex flex-col justify-center items-center" >
            <label className='mb-4'>
            Nombre:
            <input
                type="text"
                name="nombre"
                value={obraData.nombre}
                onChange={handleInputChange}
            />
            </label>

            <label className='mb-4'>
            Localidad:
            <input
                type="text"
                name="localidad"
                value={obraData.localidad}
                onChange={handleInputChange}
            />
            </label>

            <label className='mb-4'>
            Municipio:
            <input
                type="text"
                name="municipio"
                value={obraData.municipio}
                onChange={handleInputChange}
            />
            </label>

            <label className='mb-4'>
            Dependencia:
            <input
                type="text"
                name="dependencia"
                value={obraData.dependencia}
                onChange={handleInputChange}
            />
            </label>

            <label className='mb-4'>
            Fecha:
            <input
                type="date"
                name="fecha"
                value={obraData.fecha}
                onChange={handleInputChange}
            />
            </label>

            <label className='mb-4'>
            Presupuesto:
            <input
                type="number"
                name="p_inicial"
                value={obraData.p_inicial || ''}
                onChange={handleInputChange}
            />
            </label>

            
            <button 
            className='bg-green-400'
            type="button" onClick={handleCreateObra}>
            Crear Obra
            </button>
        </form>
    </div>
);

}

export default ObraForm;