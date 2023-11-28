import Cookies from 'js-cookies'
import axios from 'axios'

const apiUrlBase = 'http://127.0.0.1:8000'



const apiConfig ={
    headers: {
        'Content-Type': 'application/json'
    },
};

const addTokenToHeaders = () => {
    const token = Cookies.get('loggedToken');
    if(token){
        apiConfig.headersToken = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        }
    }
};




//! Usuario peticiones --------
//* Login
export const loginUser = async (username, password) =>{
    try {
        addTokenToHeaders();
    
        const apiUrl = `${apiUrlBase}/app/api/v1/login/`;
        const response = await axios.post(apiUrl, { username, password }, apiConfig.headers);
    
        if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
            return responseData;
        } else {
            throw new Error('Error al iniciar Sesión !!');
        }


    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
    }
};
//* Register
export const registerUer = async (userData) =>{
    try{
        const apiUrl = `${apiUrlBase}/app/api/v1/register/`
        const response = await axios.post(apiUrl, userData,apiConfig.headers );
        

        if (response.status >= 200 && response.status < 300) {
            console.log('Usuario registrado con éxito:', response.data);
          } else {
            throw new Error('Error al registrarse');
          }

    }catch(error){
        console.error('Error al registrarse', error.message)
        throw error
    }
};
//* Logout
export const logoutUser = async () =>{
    try{
        const apiUrl = `${apiUrlBase}/app/api/v1/logout/`;
        const response = await axios.delete(apiUrl, apiConfig.headersToken);

        //* DELETE generalmente no devuelven un cuerpo (body), por lo que response.data puede ser undefined.

        if (response.status >= 200 && response.status < 300) {
            console.log('Sesión cerrada con éxito');
        } else {
            throw new Error('Error al cerrar sesión');
        }
    }catch(error){
        console.error('Error al cerrar sesion:', error.message);
        throw error;
    }
};



//! Modelo de Obra ------------------------------------------
//* LISTAR OBRAS
export const listObra = async () =>{
    try{
        addTokenToHeaders();
        const apiUrl = `${apiUrlBase}/app/api/v1/obras/`;
        const response = await axios.get(apiUrl, apiConfig.headersToken);

        if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
            return responseData;
        } else {
            throw new Error('Error al obtener obras !!');
        }


    }catch(error){
        console.error('Error al obtener la lista de obras.', error.message);
        throw error;
    }
};
//* CREAR OBRAS
export const createObra = async (obraData)=>{
    try{
        addTokenToHeaders();
        const apiUrl = `${apiUrlBase}/app/api/v1/obras/`;
        const response = await axios.post(apiUrl, obraData, apiConfig.headersToken);


        if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
            return responseData;
        } else {
            throw new Error('Error al crear la obra !!');
        }


    }catch(error){
        console.error('Error al crear obra pruebe otra vez.', error.message);
        throw error;
    }
};
//* ACTUALIZAR OBRAS
export const updateObra = async (obraId, obraData) => {
    try {
        addTokenToHeaders();
        const apiUrl = `${apiUrlBase}/app/api/v1/obras/${obraId}/`;
        const response = await axios.patch(apiUrl, obraData, apiConfig.headersToken);

        if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
            return responseData;
        } else {
            throw new Error('Error al actualizar la obra !!');
        }
    } catch (error) {
    console.error('Error al actualizar la obra:', error.message);
    throw error;
    }
};

//* DELETE OBRAS
export const deleteObra = async (obraId) => {
    try {
        addTokenToHeaders();
        const apiUrl = `${apiUrlBase}/app/api/v1/obras/${obraId}/`;
        const response = await axios.delete(apiUrl, apiConfig.headersToken);

        if (response.status >= 200 && response.status < 300) {
            const responseData = response.data;
            return responseData;
        } else {
            throw new Error('Error al eliminar la obra !!');
        }
    } catch (error) {
    console.error('Error al eliminar la obra:', error.message);
    throw error;
    }
};


//! Modelo Tareas -----------------------------------------