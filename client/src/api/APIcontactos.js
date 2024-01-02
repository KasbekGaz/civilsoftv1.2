import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/contacs/api/v1';

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    },
});
//? id es para proveedor_id y material y banca tienen su propio nombre
const APIcontactos = {
    //! Proveedores peticiones
    //* Listar Proveedores
    listP: async () =>{
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instance.get('/proveedores/', {
                headers: { Authorization: `Token ${token}` }
            });
            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('Algo salio mal', error.message);
            throw error;
        }
    },
    //* Datos de un proveedor en concreto
    getProveedorById: async (id) => {
        try {

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instance.get(`/proveedores/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
        
            console.log('Response Data:', response.data);

            return response.data;
        } catch (error) {

            console.error(`Error al obtener los detalles del proveedor con ID ${id}:`, error.message);

            throw error;
        }
    },
    //* Agregar un proveedor
    createP: async (infoData) =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.post('/proveedores/', infoData, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
    
            return response.data;
        } catch (error) {
            console.error('No se pudo agregar la informacion del proveedor: ', error.message);
            throw error;
        }
    },
    //*  Actualizar datos de un proveedor
    updateP: async (id, infoData) => {
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            
            const response = await instance.put(`/proveedores/${id}/`,obraData,{
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);
            return response.data;

        }catch(error){
            console.error(`Error al actualizar informacion del proveedor con ID ${id}:`, error.message);
            throw error;
        }
    },
    //* Eliminar un proveedor
    deleteP: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.delete(`/proveedores/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;
    
        } catch (error) {
            console.error(`Error al eliminar proveedor con ID ${id}:`, error.message);
            throw error;
        }
    },
    //! Materiales Peticiones
    //* Listar Materiales segun la id del proveedor
    listMaterial: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instance.get(`/materiales-by-proveedor/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la lista de materiales:', error.message);
            throw error;
        }
    },
    //* Crear Materiales segun la id del proveedor
    createMaterial: async (id, materialData) =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.post(`/create-material-for-proveedor/${id}/`, materialData, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;
    
        } catch (error) {
            console.error('No se pudo agregar el Material: ', error.message);
            throw error;
        }
    },
    //* Actualizar Materiales segun la id del proveedor
    updateMaterial: async (id, materialId, materialData) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instance.put(`/update-material-for-proveedor/${id}/${materialId}/`, materialData, {
            headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al actualizar el material:', error.message);
            throw error;
        }
    },
    //* Eliminar Materiales seun la id del proveedor
    deleteMaterial: async (id, materialId) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await instance.delete(`/delete-material-for-proveedor/${id}/${materialId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al eliminar el Material:', error.message);
            throw error;
        }
    },
    //! Banca peticiones
    //* Listar info banca sgun id de proveedor
    listBanca: async (id) =>{
        try {
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instance.get(`/banca-by-proveedor/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la lista de banca:', error.message);
            throw error;
        }
    },
    //* Crear info banca segun la id del proveedor
    createBanca: async (id, bancaData) =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.post(`/create-banca-for-proveedor/${id}/`, bancaData, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;
    
        } catch (error) {
            console.error('No se pudo agregar la informacion bancaria', error.message);
            throw error;
        }
    },
    //* Actualizar info banca segun la id del proveedor
    updateBanca: async (id, bancaId, bancaData) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instance.put(`/update-banca-for-proveedor/${id}/${bancaId}/`, bancaData, {
            headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al actualizar la informacion bancaria:', error.message);
            throw error;
        }
    },
    deleteBanca: async (id, bancaId) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await instance.delete(`/delete-banca-for-proveedor/${id}/${bancaId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al eliminar la informacion bancaria', error.message);
            throw error;
        }
    },
};


export default APIcontactos;