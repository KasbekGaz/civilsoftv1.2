import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../../api/APIbackend";



const UpdateMaterial = () => {
    const { id, mId } = useParams();
    const navigate = useNavigate();

    console.log('Id-Proveedor y Id-material:', id, mId);
    //!Para el formulario
    const [ materialData, setMaterialData ] = useState({
        proveedor: id,
        unidad: '',
        material: '',
        precio: '',
    });

    useEffect(() => {
        //* cargar datos de material
        const fetchMaterialData = async () => {
            try{
                console.log('Id del material:', mId);
                const material = await APIbackend.getMaterialById(mId);
                console.log(material);
                setMaterialData({
                    proveedor: material.proveedor,
                    unidad: material.unidad,
                    material: material.material,
                    precio: material.precio,
                });
            }catch(error){
                console.error('Error al cargar datos en material', error.message)
            }
        };

        fetchMaterialData();

    }, [mId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMaterialData({ ...materialData, [name]: value});
    };

    //! Funcion para actualizar Material
    const handleUpdateMaterial = async () => {
        try{
            console.log('Datos que entran: ', id, mId, materialData);
            await APIbackend.updateMaterial(id, mId, materialData);
            alert('Se actualizo correctamente !!');
            navigate(`/details-prov/${id}`);
        }catch(error){
            console.error('Error al actualizar datos', error.message);
        }
    };
    //! regresar a la vista anterior
    const handleBack= (id) => {
        navigate(`/details-prov/${id}`);
    };

    return(
        <div className=" container mx-4 my-4 max-w-sm p-6 bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Actualizando Material: {materialData.material} </h1>

            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4" 
                onClick={() =>  handleBack(id)}>
                    Regresar
            </button>

            <form className="flex flex-col justify-center items-center">
                <label className="block my-2 font-medium">
                    Unidad:
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="unidad"
                        value={materialData.unidad}
                        onChange={handleInputChange} />
                </label>
                <label className="block my-2 font-medium">
                    Material:
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="material"
                        value={materialData.material}
                        onChange={handleInputChange} />
                </label>
                <label className="block my-2 font-medium">
                    Precio $ :
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        name="precio"
                        value={materialData.precio}
                        onChange={handleInputChange} />
                </label>
            </form>
            <button 
                className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                onClick={handleUpdateMaterial}>
                Agregar Material
            </button>
        </div>
    );
};

export default UpdateMaterial;