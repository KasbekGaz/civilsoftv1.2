import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";





const ControlObra =  () =>{
    const { id } = useParams(); //* id es de la obra
    const [ obraData, setObraData ] = useState({});
    const [ volumen, setVolumen ] = useState([]);

    const navigate = useNavigate();

    const fetchObraDetails = async () =>{
        try{
            console.log(id);
            const obraData = await APIbackend.getObraById(id);
            setObraData(obraData);

        }catch(error){
            console.error('Error al obtener datos.', error.message);
        }
    };
    const handleBack = () =>{
        console.log('El id:', id);
        navigate(`/details-obra/${id}`);
    };

    //! Para el formulario se usa esto--------------------
    const [volumenData, setVolumenData] =useState({
        obra: id,
        codigo: '',
        unidad: '',
        concepto: '',
        estado: '',
        //* Cantidad Contratada
        volumen: '0',
        precio: '0',
        importe: '',
        //* Cantidad Ejecutada
        v_mod: '0',
        importe_mod: '',
        diferencia: '',

    });
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setVolumenData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCreateVolumen = async () =>{
        try{
            console.log(volumenData);
            const response = await APIbackend.CreateVolumenbyObra(id, volumenData)

            console.log('Gasto creado: ', response);
            alert('Gasto agregado correctamente!');
            //*Para limpiar el formulario----
            setGastoData({
                obra: id,
                codigo: '',
                unidad: '',
                concepto: '',
                estado: '',
                //* Cantidad Contratada
                volumen: '0',
                precio: '0',
                importe: '',
                //* Cantidad Ejecutada
                v_mod: '0',
                importe_mod: '',
                diferencia: '',
                
            });
            fetchVolumen();
        }catch(error){
            console.error('Error al crear Gasto', error.message);
        }
    };

    useEffect(() => {
        fetchObraDetails(); //*Obtener datos de la obra
        fetchVolumen();
    }, [id])

//! Listar los volumenes por id obra
const fetchVolumen = async () =>{
    try{
        console.log(id); //obra_id
        const volumenData = await APIbackend.ListarVolumenbyObra(id);
        setVolumen(volumenData);
        console.log('Obra:', id, 'Datos Obtenidos: ', volumenData);

    }catch(error){
        console.error('Error al listar volumenes');
    }
}
//! Para actualizar volumen por su id
const handleActualizar = (id, volumenId) =>{
    console.log('Datos que entran', id , volumenId);
    navigate(`/update-volumen-by-obra/${id}/${volumenId}`);
};
//! Para Eliminar volumen por su di
const handleEliminar = async (id, volumenId) => {
    try{
        await APIbackend.deleteGastobyObra(id, volumenId);
        alert('Eliminaste el concepto con exito!!')
        fetchGastos();
    }catch(error){
        console.error('Error al eliminar el gasto', error.message);
    }
};

return(
    <div>
        <h1>Comparativa de volumenes</h1>
        <h1>Proyecto "{obraData.nombre}"</h1>

        <button className="bg-green-400 py-2 px-4 mb-4"
            onClick={handleBack}>
            Regresar a las acciones
        </button>

    </div>
);


};

export default ControlObra;