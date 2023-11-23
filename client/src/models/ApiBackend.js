import Cookies from 'js-cookies'
import axios from 'axios'

const apiUrlBase = 'http://127.0.0.1:8000'
const token = Cookies.get('loggedToken')
const apiConfig ={
    headers: {
        'Content-Type': 'application/json'
    },
    headersToken: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
    }
}



export const loginUser = async (username, password) =>{
    try {
        const apiUrl= `${apiUrlBase}/app/api/v1/login/`
        const response = await axios.post(apiUrl, {
            headers: apiConfig.headers,
            body: JSON.stringify({username,password})
        })


        if(!response.ok){
            throw new Error('Error al iniciar Sesión !!')
        }
        const responseData = await response.json()
        return responseData
    }catch (error){
        console.error('Error al iniciar sesión:', error.message)
        throw error
    }

}
