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
    //* Listar OBRAS
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
    //* CREAR una obra
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
    //* Pedimos datos de una obra en concreto
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
    
    //* Actualizar un obra
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
    //* ELIMINAR una obra
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
    //* Listar TAREAS por obra_id
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
    //* CREAR tareas por obra_id
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
    //* ACTUALIZAR tarae por obra_id
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

    //! GASTOS CRUD
    //* Pedimos lista de TAREAS por obra_id
    listGastoByObra: async (obraId) => {
        try {

            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instance.get(`/gastosbyObra/${obraId}/`, {
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);

            return response.data;


        } catch (error) {
            console.error('Error al obtener la lista de tareas por obra:', error.message);
            throw error;
        }
    },
    //* CREAR un gasto a una obra_id
    createTareabyObra: async (obraId, gastoData) =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.post(`/create-gasto-for-obra/${obraId}/`, gastoData, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;
    
        } catch (error) {
            console.error('No se pudo guardar el Gasto: ', error.message);
            throw error;
        }
    },
    //* ACTUALIAR un gasto por obra_id
    updateTareaForObra: async (obraId, gastoId, gastoData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await instance.put(`/update-gasto-for-obra/${obraId}/${gastoId}/`, gastoData, {
            headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al actualizar el Gasto:', error.message);
            throw error;
        }
    },
    //* ELIMINAR un gasto por obra_id
    deleteGastoForObra: async (obraId, gastoId) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instance.delete(`/delete-gasto-for-obra/${obraId}/${gastoId}`,
            {
                headers: {Authorization: `Token ${token}`},
            });

            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('Error al borrar el Gasto: ', error.message);
            throw error;
        }
    },
    //!  CRUD de Galeria
    //* Listar la galeria por obra_id
    ListGaleriaByObra: async (obraId) => {
        try{
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instance.get(`/galeriabyObra/${obraId}`,{
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data)
            return response.data;

        }catch(error){

        }
    },
    //* CREAR galeria por obra_id
    CreateGaleriabyObra: async (obraId, galeriaData) => {
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instance.post(`/create-galeria-for-obra/${obraId}`, galeriaData, {
                headers: { Authorization: `Token ${token}` },
            });
            
            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('No se pudo agregar la galeria: ', error.message);
            throw error;
        }
    },
    //* ACTUALIZAR galeria por obra_id
    


};

export default APIbackend;
