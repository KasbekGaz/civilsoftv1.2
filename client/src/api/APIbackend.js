import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/app/api/v1';

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const APIbackend = {
    login: async (username, password) => {
        try {
        const response = await instance.post('/login/', { username, password });
        const { token } = response.data;
        // Almacena el token en el almacenamiento local o en un estado global
        localStorage.setItem('token', token);
        return response.data;
        } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error.message);
        throw error;
        }
    },

    logout: async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await instance.delete('/logout/', {
            headers: { Authorization: `Token ${token}` },
        });
        // Elimina el token del almacenamiento local o del estado global
        localStorage.removeItem('token');
        return response.data;
        } catch (error) {
        console.error('Error en la solicitud de cierre de sesión:', error.message);
        throw error;
        }
    },

    registerUser: async (userData) => {
        try {
        const response = await instance.post('/register/', userData);
        return response.data;
        } catch (error) {
        console.error('Error en la solicitud de registro de usuario:', error.message);
        throw error;
        }
    },

  // Obras peticiones
    
    listObra: async () =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instance.get('/obras/', {
            headers: { Authorization: `Token ${token}` },
        });
        console.log(response.data)
        return response.data;
        
        } catch (error) {
            console.error('Algo salio mal', error.message);
        throw error;
        }
    },

    createObra: async (obraData) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.post('/obras/', obraData, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
    
            return response.data;
        } catch (error) {
            console.error('No se pudo crear Obra: ', error.message);
            throw error;
        }
    },

    
    getObraById: async (id) => {
        try {
            const response = await instance.get(`/obras/${id}/`);
        
            console.log('Response Data:', response.data);

            return response.data;
        } catch (error) {

            console.error(`Error al obtener los detalles de la obra con ID ${id}:`, error.message);

            throw error;
        }
    }, 
    

    updateObra: async (id, obraData) => {
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            
            const response = await instance.put(`/obras/${id}/`,obraData,{
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);
            return response.data;

        }catch(error){
            console.error(`Error al actualizar la obra con ID ${id}:`, error.message);
            throw error;
        }
    },

    deleteObra: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.delete(`/obras/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;
    
        } catch (error) {
            console.error(`Error al eliminar la obra con ID ${id}:`, error.message);
            throw error;
        }
    }



};

export default APIbackend;
