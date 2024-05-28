import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.2:8000/app/api/v1';
const API_BASE_URL_CONTACS = 'http://192.168.100.2:8000/contacs/api/v1';
//manejo de archivos instancia
const API_MEDIA_URL = 'http://192.168.100.2:8000/app/api/v1';


const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const instanceC = axios.create({
    baseURL: API_BASE_URL_CONTACS,
    headers: {
        'Content-Type': 'application/json',
    },
});

const instanceMedia = axios.create({
    baseURL: API_MEDIA_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
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
            console.log(userData);
            const response = await instance.post('/register/', userData);
            console.log('Datos:', response.data)
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
    //* Listar TAREAS por su id
    getAllTareas: async () =>{
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instance.get(`/tareas/`,{
                headers: { Authorization: `Token ${token}` },
            });

            console.log('Response data:', response.data);

            return response.data;

        }catch(error){
            console.error('Error al obetener todas las tareas');
            throw error;
        }
    },

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
            console.log('Token:', token);
            const response = await instance.put(`/update-tarea-for-obra/${obraId}/${tareaId}/`, tareaData, {
            headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error al actualizar la tarea:', error.message);
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
    //* Obtener un gasto por su id
    getGastoById: async (gastoId) => {
        try{
            console.log('Id que entra:', gastoId);
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instance.get(`/gastos/${gastoId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            console.log('Response Data:', response.data);
            return response.data;
        }catch(error){
            console.error(`Error al obtener los detalles del Gasto con ID ${gastoId}:`, error.message);
            throw error;
        }
    },
    //* Pedimos lista de TAREAS por obra_id
    listGastobyObra: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await instance.get(`/gastosbyObra/${id}/`, {
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
    createGastobyObra: async (id, gastoData) =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instance.post(`/create-gasto-for-obra/${id}/`, gastoData, {
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
    updateGastobyObra: async (id, gastoId, gastoData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await instance.put(`/update-gasto-for-obra/${id}/${gastoId}/`, gastoData, {
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
    deleteGastobyObra: async (id, gastoId) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instance.delete(`/delete-gasto-for-obra/${id}/${gastoId}/`,
            {
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('Error al borrar el Gasto: ', error.message);
            throw error;
        }
    },
    //!  CRUD de Galeria
     //* Obtener un gasto por su id
    getGaleriaById: async (GaleriaId) => {
        try{
            console.log('Id que entra:', GaleriaId);
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instanceMedia.get(`/galeria/${GaleriaId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            console.log('Response Data:', response.data);
            return response.data;
        }catch(error){
            console.error(`Error al obtener los detalles del Gasto con ID ${GaleriaId}:`, error.message);
            throw error;
        }
    },
    //* Listar la galeria por obra_id
    ListGaleriabyObra: async (obraId) => {
        try{
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instanceMedia.get(`/galeriabyObra/${obraId}/`,{
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data)
            return response.data;

        }catch(error){
            console.log('No se pudo cargar los datos de la galeria:', error.message);
            throw error;
        }
    },
    //* CREAR galeria por obra_id
    CreateGaleriabyObra: async (obraId, galeriaData) => {
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token, galeriaData);

            const response = await instanceMedia.post(`/create-galeria-for-obra/${obraId}/`, galeriaData, {
                headers: { Authorization: `Token ${token}` },
            });
            
            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('No se pudo agregar la galeria: ', error.message);
            console.log('form-data: ', galeriaData);
            console.log('Error details:', error.response.data);
            
        }
    },
    //* ACTUALIZAR galeria por obra_id
    updateGaleriabyObra: async (obraId, galeriaId, galeriaData) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instanceMedia.put(`/update-galeria-for-obra/${obraId}/${galeriaId}/`, galeriaData, {
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error al actualizar la Galeria: ', error.message);
            throw error;
        }
    },
    //* ELIMINAR galeria por obra_id
    deleteGaleriabyObra: async (obraId, galeriaId) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instanceMedia.delete(`/delete-galeria-for-obra/${obraId}/${galeriaId}/`, {
                headers: { Authorization: `Token ${token}` }
            });

            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error al borrar la Galeria', error.message);
            throw error;
        }
    },
    //! CRUD de Volumenes
    //* Obtener un gasto por su id
    getVolumenById: async (volumenId) => {
        try{
            console.log('Id que entra:', volumenId);
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instance.get(`/volumen/${volumenId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            console.log('Response Data:', response.data);
            return response.data;
        }catch(error){
            console.error(`Error al obtener los detalles del Gasto con ID ${volumenId}:`, error.message);
            throw error;
        }
    },
    //* Listar volumenes por id obra
    ListarVolumenbyObra: async (obraId) => {
        try{
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instance.get(`/volumenbyObra/${obraId}/`,{
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data)
            return response.data;

        }catch(error){
            console.log('No se pudo cargar los datos en comparativa de volumenes:', error.message);
            throw error;
        }
    },
    //* Crear un volumen para una obra segun su id
    CreateVolumenbyObra: async (obraId, volumenData) => {
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            console.log('datos:', obraId,volumenData);
            const response = await instance.post(`/create-volumen-for-obra/${obraId}/`, volumenData, {
                headers: { Authorization: `Token ${token}` },
            });
            
            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('No se pudo agregar el volumen: ', error.message);
            throw error;
        }
    },
    //* Actualizar un volumen segun una la obra id
    updateVolumenbyObra: async (obraId, volumenId, volumenData) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instance.put(`/update-volumen-for-obra/${obraId}/${volumenId}/`, volumenData, {
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error al actualizar el volumen: ', error.message);
            throw error;
        }
    },
    //* Eliminar volumen por obra_id y su propio id
    deleteVolumenbyObra: async (obraId, volumenId) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instance.delete(`/delete-volumen-for-obra/${obraId}/${volumenId}/`, {
                headers: { Authorization: `Token ${token}` }
            });

            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error al borrar el volumen', error.message);
            throw error;
        }
    },
    //! CRUD de ABONO ----------------------------------------------
    //* Obtener un abonos por su id
    getAbonoById: async (abonoId) => {
        try{
            console.log('Id que entra:', abonoId);
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instance.get(`/abono/${abonoId}/`, {
                headers: { Authorization: `Token ${token}` },
            });

            console.log('Response Data:', response.data);
            return response.data;
        }catch(error){
            console.error(`Error al obtener los detalles del Gasto con ID ${volumenId}:`, error.message);
            throw error;
        }
    },
    //* Listar abonos por id obra
    ListarAbonobyObra: async (obraId) => {
        try{
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instance.get(`/abonobyObra/${obraId}/`,{
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data)
            return response.data;

        }catch(error){
            console.log('No se pudo cargar los datos en abonos:', error.message);
            throw error;
        }
    },
    //* Crear un abono para una obra segun su id
    CreateAbonobyObra: async (obraId, abonoData) => {
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            console.log('datos:', obraId,abonoData);
            const response = await instance.post(`/create-abono-for-obra/${obraId}/`, abonoData, {
                headers: { Authorization: `Token ${token}` },
            });
            
            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('No se pudo agregar el abono: ', error.message);
            throw error;
        }
    },
    //* Actualizar un abono segun una la obra id
    updateAbonobyObra: async (obraId, abonoId, abonoData) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instance.put(`/update-abono-for-obra/${obraId}/${abonoId}/`, abonoData, {
                headers: { Authorization: `Token ${token}` },
            });

            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error al actualizar el volumen: ', error.message);
            throw error;
        }
    },
    //* Eliminar abono por obra_id y su propio id
    deleteAbonobyObra: async (obraId, abonoId) =>{
        try{
            const token = localStorage.getItem('token');
            const response = await instance.delete(`/delete-abono-for-obra/${obraId}/${abonoId}/`, {
                headers: { Authorization: `Token ${token}` }
            });

            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Error al borrar el volumen', error.message);
            throw error;
        }
    },
    //! Proveedores peticiones -------------------------------------
    //* Listar Proveedores
    listP: async () =>{
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instanceC.get('/proveedores/', {
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

            const response = await instanceC.get(`/proveedores/${id}/`, {
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
            console.log('datos a enviar: ', infoData);
            const response = await instanceC.post('/proveedores/', infoData, {
                headers: { Authorization: `Token ${token}` },
            });
    
            console.log(response.data);
            return response.data;

        }catch(error){
            console.error('No se pudo agregar el proveedor ', error.message);
            throw error;
        }
    },
    //*  Actualizar datos de un proveedor
    updateP: async (id, infoData) => {
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            console.log("datos", id,  infoData);
            const response = await instanceC.put(`/proveedores/${id}/`,infoData,{
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
    
            const response = await instanceC.delete(`/proveedores/${id}/`, {
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
    //* Listar  TODOS materiales
    AllMateriales: async () =>{
        try{
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await instanceC.get('/materiales/', {
                headers: { Authorization: `Token ${token}` }
            });
            console.log(response.data);
            return response.data;
        }catch(error){
            console.error('Algo salio mal', error.message);
            throw error;
        }
    },
    getMaterialById: async (id) => {
        try {

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instanceC.get(`/materiales/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
        
            console.log('Response Data:', response.data);

            return response.data;
        } catch (error) {

            console.error(`Error al obtener los detalles del material ${id}:`, error.message);

            throw error;
        }
    },
    //* Listar Materiales segun la id del proveedor
    listMaterial: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);

            const response = await instanceC.get(`/materiales-by-proveedor/${id}/`, {
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
    
            const response = await instanceC.post(`/create-material-for-proveedor/${id}/`, materialData, {
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
            const response = await instanceC.put(`/update-material-for-proveedor/${id}/${materialId}/`, materialData, {
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
            const response = await instanceC.delete(`/delete-material-for-proveedor/${id}/${materialId}/`, {
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

            const response = await instanceC.get(`/banca-by-proveedor/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la lista de banca:', error.message);
            throw error;
        }
    },
    //* Banca por su Id
    getBancaById: async (id) => {
        try {

            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await instanceC.get(`/banca/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            });
        
            console.log('Response Data:', response.data);

            return response.data;
        } catch (error) {

            console.error(`Error al obtener los datos de la banca ${id}:`, error.message);

            throw error;
        }
    },
    //* Crear info banca segun la id del proveedor
    createBanca: async (id, bancaData) =>{
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
    
            const response = await instanceC.post(`/create-banca-for-proveedor/${id}/`, bancaData, {
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
            const response = await instanceC.put(`/update-banca-for-proveedor/${id}/${bancaId}/`, bancaData, {
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
            const response = await instanceC.delete(`/delete-banca-for-proveedor/${id}/${bancaId}/`, {
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

export default APIbackend;
