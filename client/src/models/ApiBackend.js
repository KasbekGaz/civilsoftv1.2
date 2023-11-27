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
    
        if (!response.ok) {
          throw new Error('Error al iniciar Sesión !!');
        }
        const responseData = await response.data;
        return responseData;
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
      }
};
//* Register
export const registerUer = async userData =>{
    try{
        const apiUrl = `${apiUrlBase}/app/api/v1/register/`
        const response = await axios.post(apiUrl, userData,apiConfig.headers );
        console.log('Usuario registrado con éxito:', response.data);
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

        if(!response.ok){
            throw new Error('Error al cerrar sesion!!');
        }

        console.log('Sesión cerrada con éxito:', response.data);
    }catch(error){
        console.error('Error al cerrar sesion:', error.message);
        throw error;
    }
};



//! Modelo de Obra ------------------------------
//* LISTAR OBRAS
export const listObra = async () =>{
    try{
        addTokenToHeaders();
        const apiUrl = `${apiUrlBase}/app/api/v1/obras/`;
        const response = await axios.get(apiUrl, apiConfig.headersToken);

        if(!response.ok){
            throw new Error('Error al obtener obras !!')
        }

        const responseData = await response.data;
        return responseData;


    }catch(error){
        console.error('Error al obtener la lista de obras.', error.message);
        throw error;
    }
}
//* CREAR OBRAS

