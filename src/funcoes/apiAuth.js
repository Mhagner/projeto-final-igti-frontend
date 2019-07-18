import axios from 'axios'
import { getToken } from './services';

const apiAuth = axios.create({
    baseURL: 'http://localhost:3003/auth'
})

export default apiAuth


