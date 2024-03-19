import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";

const ControlGaleria = () => {
    const { id } = useParams(); //* id de obra
    const [obraData, setObraData] = useState({});
    const [archivo, setArchivo] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const fetchObraDetails = async () => {
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

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
        console.log(archivo);
    };
//! Para crear la galeria --------------------- 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('descripcion', descripcion);
        formData.append('fecha', fecha);
        formData.append('obra', id);

        console.log('Datos:', formData);

        try {
        await APIbackend.CreateGaleriabyObra(id, formData);
        fetchImages();
        } catch (error) {
        console.error('Error al agregar la imagen:', error);
        }
        
        alert('Se agregaron los datos correctamente!');
        // Limpiar el formulario
        setArchivo(null);
        setDescripcion('');
        setFecha('');
    };
//! Para listar las fotos de una obra
    const fetchImages = async () => {
        try {
        const response = await APIbackend.ListGaleriabyObra(id);
        setImages(response);
        console.log(response);
        } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        }
    };

    useEffect(() => {
        fetchObraDetails();
        fetchImages();
    }, [id]);   

    //! Para Actualizar gasto por su id
    const handleActualizar = (id, galeriaId) =>{
        console.log('Datos que entran', id , galeriaId);
        navigate(`/update-galeria-by-obra/${id}/${galeriaId}`);
    };
    //! Para Eliminar un gasto por su id
    const handleEliminar = async (id, galeriaId) => {
        try{
            await APIbackend.deleteGaleriabyObra(id, galeriaId);
            alert('Eliminaste el gasto con exito!!')
            fetchImages();
        }catch(error){
            console.error('Error al eliminar la(s) foto(s)', error.message);
        }
    };

return (
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Control de Galeria</h1>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Proyecto "{obraData.nombre}" </h1>

                <button className="block w-full text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 my-4"
                    onClick={handleBack}
                    > 
                    Regresar a las Acciones
                </button>

        <div className="mx-auto my-6 max-w-sm p-6 bg-indigo-950 border border-black rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col justify-center items-center mt-2">
                <label className="block mb-2">Seleccionar imagen:</label>
                <input type="file" onChange={handleFileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <label className="block mb-2">Descripción:</label>
                <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe la actividad"
                required
                />
                <label className="block mb-2">Fecha:</label>
                <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                />

                <button type="submit" className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500">
                Agregar Imagen
                </button>
            </form>
        </div>

        <div className="flex flex-wrap p-4 bg-indigo-950 border border-black drop-shadow-xl rounded-2xl">
            <table className="w-full">
                <thead>
                    <th> Ruta del archivo </th>
                    <th> Descripcion </th>
                    <th> Fecha </th>
                    <th> Acciones </th>
                </thead>
                <tbody>
                    {images.map((image) => (
                        <tr key={image.id}>
                            <td >
                            <img src={image.archivo}></img>
                            </td>
                            <td>
                                {image.descripcion}
                            </td>
                            <td>
                                {image.fecha}
                            </td>
                            <td>
                                <div className="flex justify-between px-6">
                                    <button className="font-semibold rounded-full bg-orange-500 py-2 px-4 mb-4 mt-4 hover:bg-orange-600"
                                        onClick={() => handleActualizar(id, image.id)}>
                                        Actualizar
                                    </button>
                                    <button className="font-semibold rounded-full bg-red-500 py-2 px-4 mb-4 mt-4 hover:bg-red-600"
                                        onClick={() => handleEliminar(id, image.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

</div>
);
};

export default ControlGaleria;
