import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrlBase = 'http://127.0.0.1:8000';

const apiConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
};


const addTokenToHeaders = () => {
    const token = Cookies.get('Security');
    if (token) {
        apiConfig.headers.Authorization = `Token ${token}`;
    }else{
        console.error('Token no encontrado en las cookies.');
    }
    console.log('Token en headers:', apiConfig.headers.Authorization);
};

//! Usuario login
export const loginUser = async (userData) => {
    try {

        const apiUrl = `${apiUrlBase}/app/api/v1/login/`;
        const response = await axios.post(apiUrl, userData, apiConfig);

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
        const response = await axios.post(apiUrl, userData, apiConfig);

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
    console.log('Token :', token);

    if (token) {
        // Agrega el token al encabezado de la solicitud
        apiConfig.headers.Authorization = `Token ${token}`;

        // Realiza la solicitud de cierre de sesión
        const apiUrl = `${apiUrlBase}/app/api/v1/logout/`;
        const response = await axios.delete(apiUrl, apiConfig);

        console.log('Respuesta del Servidor: ', response.data);

        // Elimina el token de las cookies después de cerrar sesión
        Cookies.remove('Security');
        Cookies.remove('csrftoken');
        console.log('Token eliminado:', Cookies.get('Security'));
        console.log('Token eliminado:', Cookies.get('csrftoken'));
        console.log('Token eliminado:', token);
    } else {
        console.error('Token no encontrado en las cookies.');
    }
    } catch (error) {
    console.error('Error al cerrar sesión: ', error.message);
    throw error;
    }
};

