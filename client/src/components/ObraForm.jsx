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

            navigate('/dashboard');

        }catch(error){
            console.error('Error al crear la obra: ', error.message);
        }
    }

return (
    <div>
        <h2>Crear Obra</h2>

        <form>
            <label>
            Nombre:
            <input
                type="text"
                name="nombre"
                value={obraData.nombre}
                onChange={handleInputChange}
            />
            </label>

            <label>
            Localidad:
            <input
                type="text"
                name="localidad"
                value={obraData.localidad}
                onChange={handleInputChange}
            />
            </label>

            <label>
            Municipio:
            <input
                type="text"
                name="municipio"
                value={obraData.municipio}
                onChange={handleInputChange}
            />
            </label>

            <label>
            Dependencia:
            <input
                type="text"
                name="dependencia"
                value={obraData.dependencia}
                onChange={handleInputChange}
            />
            </label>

            <label>
            Fecha:
            <input
                type="date"
                name="fecha"
                value={obraData.fecha}
                onChange={handleInputChange}
            />
            </label>

            <label>
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