import * as ApiBackend from '../models/ApiBackend';

//! User
    export const registerUser = async (userData) => {
    try {
        return await ApiBackend.registerUser(userData);
    } catch (error) {
        // Manejo de errores común para el registro de usuarios
        console.error('Error al registrar usuario: ', error.message);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        return await ApiBackend.loginUser(userData);
    } catch (error) {
        // Manejo de errores común para el inicio de sesión
        console.error('Error al iniciar sesión: ', error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        return await ApiBackend.logoutUser();
    } catch (error) {
        // Manejo de errores común para el cierre de sesión
        console.error('Error al cerrar sesión: ', error.message);
        throw error;
    }
};

//! Obra
export const listObra = async () => {
    try {
        return await ApiBackend.listObra();
    } catch (error) {
        
        console.error('Error al listar las Obras: ', error.message);
        throw error;
    }
};

export const createObra = async (obraData) =>{
    try{
        return await ApiBackend.createObra(obraData);
    }catch(error){
        console.error('Error al crear la Obra: ', error.message);
        throw error;
    }
};