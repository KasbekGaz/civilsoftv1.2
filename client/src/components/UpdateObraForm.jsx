import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIbackend from '../api/APIbackend';

const UpdateObraForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [obraData, setObraData] = useState({
        nombre: '',
        localidad: '',
        municipio: '',
        dependencia: '',
        fecha: '',
        p_inicial: '',
    });

    useEffect(() => {
        // Cargar datos de la obra al montar el componente
        const fetchObraData = async () => {
            try {
                const obra = await APIbackend.getObraById(id);
                setObraData({
                    nombre: obra.nombre,
                    localidad: obra.localidad,
                    municipio: obra.municipio,
                    dependencia: obra.dependencia,
                    fecha: obra.fecha,
                    p_inicial: obra.p_inicial,
                });
            } catch (error) {
                console.error('Error al obtener datos de la obra:', error.message);
            }
        };

        fetchObraData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObraData({ ...obraData, [name]: value });
    };

    const handleUpdateObra = async () => {
        try {
            await APIbackend.updateObra(id, obraData);
            alert('Obra actualizada correctamente');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al actualizar la obra:', error.message);
        }
    };
    return (
        <div>
            <h2>Actualizando Obra "{obraData.nombre}"</h2>

            <form>
            <label>
            Nombre:
            <input
                type="text"
                name="nombre"
                value={obraData.nombre || ''}
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

            

                <button className='bg-orange-400' type="button" onClick={handleUpdateObra}>
                    Actualizar Obra
                </button>
            </form>
        </div>
    );
};

export default UpdateObraForm;
