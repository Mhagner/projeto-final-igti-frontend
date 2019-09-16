import axios from 'axios'
import { getToken } from './services';

const api = axios.create({
    baseURL: process.ENV.REACT_APP_API_URL//'http://localhost:3003/api'
})

api.interceptors.request.use(async config => {

    const token = getToken()

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
})

export default api

