import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrlBase = 'http://127.0.0.1:8000';

const getToken = () => Cookies.get('Security'); //* obtener token

// funcion para config de la API
const getApiConfig = () => {
    const token = getToken();

const headers = {
    'Content-Type': 'application/json',
};

// Agrega el token a los encabezados si está presente
if (token) {
    headers['Authorization'] = `Token ${token}`;
}

return {
    headers,
};
};




//! Usuario login
export const loginUser = async (userData) => {
    try {

        const apiUrl = `${apiUrlBase}/app/api/v1/login/`;
        const response = await axios.post(apiUrl, userData, getApiConfig());

        if (response.data && response.data.token) {
            const token = response.data.token;
            Cookies.set('Security', token);
            console.log('Respuesta del servidor:', response.data);
            console.log('Token almacenado:', token);
        }
    } catch (error) {
        console.error('Error al iniciar sesión: ', error.message);
        throw error;
    }
};

//! User registro
export const registerUser = async (userData) => {
    try {
        const apiUrl = `${apiUrlBase}/app/api/v1/register/`;
        const response = await axios.post(apiUrl, userData, getApiConfig());

        if (response.data && response.data.token) {
            const token = response.data.token;
            Cookies.set('Security', token);
            console.log('Respuesta del servidor:', response.data);
            console.log('Token almacenado:', token);
        }
    } catch (error) {
        console.error('Error al registrarse: ', error.message);
        throw error;
    }
};

//! User logout
export const logoutUser = async () => {
    try {
            // Obtén el token almacenado en las cookies
            const token = Cookies.get('Security');
            console.log('Token:', token);
    
            if (token) {
                // Agrega el token al encabezado de la solicitud
                const apiConfig = getApiConfig();
                apiConfig.headers.Authorization = `Token ${token}`;
    
                // Realiza la solicitud de cierre de sesión
                const apiUrl = `${apiUrlBase}/app/api/v1/logout/`;
                await axios.delete(apiUrl, apiConfig);
    
                // Elimina el token de las cookies después de cerrar sesión
                Cookies.remove('Security');
                Cookies.remove('csrftoken');
                console.log('Token eliminado:', Cookies.get('Security'));
                console.log('Token eliminado:', Cookies.get('csrftoken'));
            } else {
                console.error('Token no encontrado en las cookies.');
            }
    
    } catch (error) {
    console.error('Error al cerrar sesión: ', error.message);
    throw error;
    }
};

//! Obra endpoints
export const listObra = async () =>{
    try{
        const apiUrl = `${apiUrlBase}/app/api/v1/obras/`;
        const response = await axios.get(apiUrl, getApiConfig());
        return response.data;
    }catch(error){
        console.error('Error al cargar obras: ', error.message);
        throw error;
    }
};
export const createObra = async (obraData) =>{
    try{
        const apiUrl = `${apiUrlBase}/app/api/v1/obras/`;
        const response = await axios.post(apiUrl, obraData,  getApiConfig())

            // Verifica si la respuesta contiene datos y devuelve esos datos
        if (response.data) {
            console.log('Obra creada con éxito:', response.data);
            return response.data;
        } else {
            console.warn('La respuesta no contiene datos:', response);
        }
    }catch(error){
        console.error('Error al crear obra: ', error.message);
        throw error;
    }
};