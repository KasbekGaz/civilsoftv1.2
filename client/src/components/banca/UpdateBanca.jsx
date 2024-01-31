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
        <div className=" container mx-4 my-4 max-w-sm p-6 bg-violet-950- border border-violet-600 rounded-lg drop-shadow-xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Actualizar Informacion Bancaria</h1>

            <button className="text-center font-semibold rounded-full bg-green-400 hover:bg-green-700 py-2 px-4 mb-4 mt-4"
                onClick={() =>  handleBack(id)}>
                    Regresar
            </button>

            <form className="flex flex-col justify-center items-center">
            <label className="block my-2 font-medium">
                    Nombre del Banco:
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="banco"
                        value={bancaData.banco}
                        onChange={handleInputChange} />
                </label>
                <label className="block my-2 font-medium">
                    Clave del Banco:
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="clave_banco"
                        value={bancaData.clave_banco}
                        onChange={handleInputChange} />
                </label>
                <label className="block my-2 font-medium">
                    Cuenta de Banco:
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="cuenta_banco"
                        value={bancaData.cuenta_banco}
                        onChange={handleInputChange} />
                </label>
            </form>
            <button 
                className="text-center font-semibold rounded-full bg-yellow-500 py-2 px-4 mb-4 mt-4 hover:bg-green-500"
                onClick={handleUpdateBanca}>
                Actualizar
            </button>
        </div>
    );


};

export default UpdateBanca;