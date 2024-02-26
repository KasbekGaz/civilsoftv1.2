import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../../api/APIbackend";

const UpdateAbono = () =>{
    const { id, abonoId } = useParams();
    const navigate = useNavigate();

    console.log('Id:', id);
    console.log('AbonoId', abonoId);

    const [ abonoData, setAbonoData ] = useState({
        obra: id,
        fecha: '',
        descripcion: '',
        importe: '',
    });

    useEffect(() => {
        const fetchAbonosData = async () =>{
            try{
                const abono = await APIbackend.getAbonoById(abonoId);
                console.log('Datos',abono);
                setAbonoData({
                    obra: abono.obra,
                    fecha: abono.fecha,
                    descripcion: abono.descripcion,
                    importe: abono.importe
                })
            }catch(error){
                console.log('Error al obtener datos del abono', error.message);
            }
        }
        fetchAbonosData();
    }, [abonoId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAbonoData({ ...abonoData, [name]:value });
    };

    const handleUpdateAbono = async () =>{
        try{
            console.log('Datos que entran: ', id, abonoId, abonoData);
            await APIbackend.updateAbonobyObra(id, abonoId, abonoData);
            alert('Abono Actualizado correctamente!!');
            navigate(`/control-gastos/${id}`);
        }catch(error){
            console.error('Error al actualizar datos:', error.message);
        }
    };

    const handleBack = (id) =>{
        navigate(`/control-gastos/${id}`);
    };

return(
    <div className="container mx-4 my-4 max-w-sm p-6 bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Actualizar Abono: {abonoData.descripcion}</h1>

        <button 
            className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"
            onClick={() => handleBack(id)}
        >
            Regresar
        </button>

        <form  className="flex flex-col justify-center items-center mt-2">
                    <label  className="block my-2 font-medium">
                        Fecha: 
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            name="fecha"
                            value={abonoData.fecha}
                            onChange={handleInputChange}/>
                    </label>
                    <label className="block my-2 font-medium">
                        Descripcion:
                        <textarea 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="descripcion"
                            placeholder="Comentarios"
                            value={abonoData.descripcion}
                            onChange={handleInputChange}></textarea>
                    </label>
                    <label className="block my-2 font-medium">
                        Importe $ :
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="importe"
                            placeholder="$00.0"
                            value={abonoData.importe}
                            onChange={handleInputChange}
                            />
                    </label>

                    <button
                        className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                        type="button"
                        onClick={handleUpdateAbono}>
                        Agregar Abono
                    </button>
        </form>

    </div>
);

};

export default UpdateAbono;