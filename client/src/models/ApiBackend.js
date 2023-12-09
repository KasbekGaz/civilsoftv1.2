import axios from 'axios';
//import Cookies from 'js-cookie';

const apiUrlBase = 'http://127.0.0.1:8000/app/api/v1';

const apiUrlBase2 = 'http://127.0.0.1:8000/contacs/api/v1'



//! Usuario login
async function loginUser(username, password) {
    try {
        const response = await axios.post(`${apiUrlBase}/login/`, { username, password });
        return response.data.token;
    } catch (error) {
        throw new Error('Error al iniciar sesión');
        }
    }

//! User registro
async function registerUser(userData) {
    try {
        const response = await axios.post(`${apiUrlBase}/register/`, { userData});
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar usuario');
    }
}

//! User logout
async function logoutUser(token) {
    try {
        const response = await axios.delete(`${apiUrlBase}//logout/`, null, {
            headers: { Authorization: `Token ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al cerrar sesión');
    }
}

async function exampleUsage() {
    const token = await login('tuUsuario', 'tuContraseña');
    console.log('Token de acceso:', token);

    const registroUsuario = await register('nuevoUsuario', 'nuevaContraseña');
    console.log('Registro de usuario:', registroUsuario);

    const resultadoLogout = await logout(token);
    console.log('Resultado del logout:', resultadoLogout);



}

exampleUsage();