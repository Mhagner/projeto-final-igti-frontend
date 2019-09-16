import axios from 'axios'
import { getToken } from './services';

const apiAuth = axios.create({
    baseURL: process.env.REACT_APP_API_AUTH //'http://localhost:3003/auth'
})

export default apiAuth


