import * as ApiBackend from '../models/ApiBackend'

//! User
export const loginUser = (userData) => ApiBackend.loginUser(userData);

export const registerUser = (userData) => ApiBackend.registerUser(userData);

export const logoutUser = () => ApiBackend.logoutUser();

