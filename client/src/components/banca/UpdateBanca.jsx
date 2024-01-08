import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIbackend from "../../api/APIbackend";



const UpdateBanca = () => {
    const { id, bId } = useParams();
    const navigate = useNavigate();

    console.log('Id-proveedor y Id-infobanca:', id, bId);
    //! Para el formulario
    const [bancaData, setBancaData] = useState({
        proveedor: id,
        banco: '',
        clave_banco: '',
        cuenta_banco: '',
    });

    useEffect(() => {
        //*Cargar datos de la banca
        const fetchBancaData = async () => {
            try{
                console.log('Id de banca:', bId);
                const banca = await APIbackend.getBancaById(bId);
                console.log(banca);
                setBancaData({
                    proveedor: banca.proveedor,
                    banco: banca.banco,
                    clave_banco: banca.clave_banco,
                    cuenta_banco: banca.cuenta_banco,
                })
            }catch(error){
                console.error('Error al cargar datos en banca', error.message);
            }
        };

        fetchBancaData();
    }, [bId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBancaData({ ...bancaData, [name]: value});
    };

    //! Funcion para actuarlizar Banca
    const handleUpdateBanca = async () => {
        try{
            console.log('Datos que entrar', id, bId, bancaData);
            await APIbackend.updateBanca(id, bId, bancaData);
            alert('Se actualizo correctamente !!');
            navigate(`/details-prov/${id}`);
        }catch(error){
            console.error('Error al actualizar datos', error.message);
        }
    };
    //! Regresar la vista anterior
    const handleBack  = (id) =>{
        navigate(`/details-prov/${id}`);
    };

    return(
        <div>
            <h1>Actualizar Informacion Bancaria</h1>
            <button className="bg-green-400 py-2 px-2 mb-4"
                onClick={() =>  handleBack(id)}>
                    Regresar
            </button>
            <form className="flex flex-col justify-center items-center">
            <label className="mb-4">
                    Nombre del Banco:
                    <input 
                        className="ml-4"
                        type="text"
                        name="banco"
                        value={bancaData.banco}
                        onChange={handleInputChange} />
                </label>
                <label className="mb-4">
                    Clave del Banco:
                    <input 
                        className="ml-4"
                        type="text"
                        name="clave_banco"
                        value={bancaData.clave_banco}
                        onChange={handleInputChange} />
                </label>
                <label className="mb-4">
                    Cuenta de Banco:
                    <input 
                        className="ml-4"
                        type="text"
                        name="cuenta_banco"
                        value={bancaData.cuenta_banco}
                        onChange={handleInputChange} />
                </label>
            </form>
            <button 
                className="bg-green-400 py-2 px-4 mb-4 rounded-full"
                onClick={handleUpdateBanca}>
                Actualizar
            </button>
        </div>
    );


};

export default UpdateBanca;