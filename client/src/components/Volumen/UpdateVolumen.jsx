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

    const handleBack = (id) =>{
        navigate(`/control-obra/${id}`);
    }

return(
    <div className=" container mx-4 my-4 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg drop-shadow-xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" > 
            Actualizar Concepto: {volumenData.concepto} </h1>
        
        <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" 
        onClick={() => handleBack(id)}>
        Regresar
        </button>

        <form className="flex flex-col justify-center items-center">
                <label className="block my-2 font-medium">
                    Código:
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" 
                        name="codigo"
                        value={volumenData.codigo}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="block my-2 font-medium">
                    Unidad:
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" 
                        name="unidad"
                        value={volumenData.unidad}
                        onChange={handleInputChange}
                        />
                </label>
                <label className="block my-2 font-medium">
                    Concepto:
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" 
                        name="concepto"
                        value={volumenData.concepto}
                        onChange={handleInputChange}
                        />
                </label>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl" >Cantidad Contratada</h2>
                <label className="block my-2 font-medium">
                    Volumen:
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number" 
                            name="volumen"
                            value={volumenData.volumen} 
                            onChange={handleInputChange}/>
                </label>
                <label className="block my-2 font-medium">
                    Precio $ :
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number" 
                            name="precio"
                            value={volumenData.precio} 
                            onChange={handleInputChange}/>
                </label>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-2xl" >Cantidad Ejecutada</h2>
                <label className="block my-2 font-medium">
                    Volumen Modificado:
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number" 
                            name="v_mod"
                            value={volumenData.v_mod} 
                            onChange={handleInputChange}/>
                </label>

                <button
                    className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                    type="button"
                    onClick={handleUpdateVolumen}>
                        Actualizar Concepto
                </button>

        </form>
    </div>
);
};

export default UpdateVolumen;