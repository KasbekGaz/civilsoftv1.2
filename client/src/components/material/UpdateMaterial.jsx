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
        <div>
            <h1>Agregar Materiales ofertados por el Proveedor</h1>
            <button className="bg-green-400 py-2 px-2 mb-4"
                onClick={() =>  handleBack(id)}>
                    Regresar
            </button>
            <form className="flex flex-col justify-center items-center">
                <label className="mb-4">
                    Unidad:
                    <input 
                        className="ml-4"
                        type="text"
                        name="unidad"
                        value={materialData.unidad}
                        onChange={handleInputChange} />
                </label>
                <label className="mb-4">
                    Material:
                    <input 
                        className="ml-4"
                        type="text"
                        name="material"
                        value={materialData.material}
                        onChange={handleInputChange} />
                </label>
                <label className="mb-4">
                    Precio:
                    <input 
                        className="ml-4"
                        type="number"
                        name="precio"
                        value={materialData.precio}
                        onChange={handleInputChange} />
                </label>
            </form>
            <button 
                className="bg-green-400 py-2 px-4 mb-4 rounded-full"
                onClick={handleUpdateMaterial}>
                Agregar Material
            </button>
        </div>
    );
};

export default UpdateMaterial;