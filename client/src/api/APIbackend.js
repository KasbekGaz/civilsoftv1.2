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

  //! OBRA peticiones
    
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

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instance.get(`/obras/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
        
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
    },

    //!TAREA peticiones
    getTareaById: async (id) => {
        try {

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instance.get(`/tareas/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
        
            console.log('Response Data:', response.data);

            return response.data;
        } catch (error) {

            console.error(`Error al obtener los detalles de la tarea con ID ${id}:`, error.message);

            throw error;
        }
    }, 
    //* Listar tareas a obra sociada
    listTareaByObra: async (obraId) => {
        try {

            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instance.get(`/tareasbyObra/${obraId}/`, {
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);

            return response.data;


        } catch (error) {
            console.error('Error al obtener la lista de tareas por obra:', error.message);
            throw error;
        }
    },

    createTareabyObra: async (obraId, tareaData) =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.post(`/create-tarea-for-obra/${obraId}/`, tareaData, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;
    
        } catch (error) {
            console.error('No se pudo crear Tarea: ', error.message);
            throw error;
        }
    },

    updateTareaForObra: async (obraId, tareaId, tareaData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await instance.put(`/update-tarea-for-obra/${obraId}/${tareaId}/`, tareaData, {
            headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al actualizar la tarea para la obra:', error.message);
            throw error;
        }
    },
    
    //* Eliminar tarea
    deleteTareaForObra: async (obraId, tareaId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await instance.delete(`/delete-tarea-for-obra/${obraId}/${tareaId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al eliminar la tarea para la obra:', error.message);
            throw error;
        }
    },


};

export default APIbackend;
