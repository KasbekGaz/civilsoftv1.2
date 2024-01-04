import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../api/APIbackend";

const ControlGaleria = () => {
    const { id } = useParams(); // id de obra
    const [archivo, setArchivo] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('descripcion', descripcion);
        formData.append('fecha', fecha);
        formData.append('obra', id);

        try {
        await APIbackend.CreateGaleriabyObra(id, formData);
        fetchImages();
        } catch (error) {
        console.error('Error al agregar la imagen:', error);
        }

        // Limpiar el formulario
        setArchivo(null);
        setDescripcion('');
        setFecha('');
    };

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
        fetchImages();
    }, [id]);

return (
<div>
    <h1>Control de Galeria</h1>

    <div>
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-2">
        <label className="block mb-2">Seleccionar imagen:</label>
        <input type="file" onChange={handleFileChange} className="mb-4" required />
        <label className="block mb-2">Descripción:</label>
        <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md"
        required
        />
        <label className="block mb-2">Fecha:</label>
        <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md"
        required
        />

        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded-md">
        Agregar Imagen
        </button>
    </form>
    </div>

    <div className="flex flex-wrap">
    {images.map((image) => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" key={image.id}>
        <img src={image.archivo} alt={image.descripcion} className="w-full h-64 object-cover" />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{image.descripcion}</div>
            <p className="text-white text-base">{image.fecha}</p>
        </div>
        </div>
    ))}
    </div>
</div>
);
};

export default ControlGaleria;
