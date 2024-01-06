import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../../api/APIbackend";


const UpdateVolumen = () =>{
    const { id, volumenId } = useParams();
    const navigate = useNavigate();

    console.log('Obra_id:', id, 'volumenId:', volumenId);
    
    const [ volumenData, setVolumenData ] = useState({
        obra: id,
        codigo: '',
        unidad: '',
        concepto: '',
        estado: '',
        //* Cantidad Contratada
        volumen: '0',
        precio: '0',
        //* Cantidad Ejecutada
        v_mod: '0',
    });

    useEffect(() => {
        //* Cargar datos antes de comprobar el componente
        const fetchVolumenData = async () => {
            try{
                const volumen = await APIbackend.getVolumenById(volumenId);
                console.log('Datos:',volumen);
                setVolumenData({
                    obra: volumen.obra,
                    codigo: volumen.codigo,
                    unidad: volumen.unidad,
                    concepto: volumen.concepto,
                    estado: volumen.estado,
                    volumen: volumen.volumen,
                    precio: volumen.precio,
                    v_mod: volumen.v_mod
                });
            }catch(error){
                console.error('Error al obtener datos:', error.message);
                throw error
            }
        };
        fetchVolumenData();
    }, [volumenId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVolumenData({ ...volumenData, [name]: value })
    };

    const handleUpdateVolumen = async () =>{
        try{
            console.log('Datos que entran: ', id, volumenId, volumenData);
            await APIbackend.updateVolumenbyObra(id, volumenId, volumenData);
            alert('Concepto actualizado correctamente !!');
            navigate(`/control-obra/${id}`);
        }catch(error){
            console.error('Error al actualizar datos: ', error.message);
            throw error;
        };
    };

return(
    <div>
        <h1>Actualizar Concepto: {volumenData.concepto} </h1>
        <form className="flex flex-col justify-center items-center">
        <label className="mb-4">
                    Código:
                    <input className="ml-2"
                        type="text" 
                        name="codigo"
                        value={volumenData.codigo}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Unidad:
                    <input className="ml-2"
                        type="text" 
                        name="unidad"
                        value={volumenData.unidad}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Concepto:
                    <input className="ml-2"
                        type="text" 
                        name="concepto"
                        value={volumenData.concepto}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="mb-4">
                    Estado del Concepto:
                    <select 
                        name="estado" 
                        value={volumenData.estado}
                        onChange={handleInputChange}>
                            <option value="Sin cambio">Sin Cambío</option>
                            <option value="Deduccion">Deduccíon</option>
                            <option value="Adicional">Adicional</option>
                            <option value="Extraordinario">Extraordinario</option>
                    </select>
                </label>
                <h2>Cantidad Contratada</h2>
                <label className="mb-4">
                    Volumen:
                        <input className="ml-2"
                            type="number" 
                            name="volumen"
                            value={volumenData.volumen} 
                            onChange={handleInputChange}/>
                </label>
                <label className="mb-4">
                    Precio $ :
                        <input className="ml-2"
                            type="number" 
                            name="precio"
                            value={volumenData.precio} 
                            onChange={handleInputChange}/>
                </label>
                <h2>Cantidad Ejecutada</h2>
                <label className="mb-4">
                    Volumen Modificado:
                        <input className="ml-2"
                            type="number" 
                            name="v_mod"
                            value={volumenData.v_mod} 
                            onChange={handleInputChange}/>
                </label>

                <button
                    className="bg-green-400"
                    type="button"
                    onClick={handleUpdateVolumen}>
                        Actualiar Concepto
                </button>

        </form>
    </div>
);
};

export default UpdateVolumen;