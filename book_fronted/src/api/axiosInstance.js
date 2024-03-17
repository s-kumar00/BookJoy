import axios from "axios"
import {getAuthToken} from "../utils/utility"
export const host = "http://localhost:8000"

const axiosInstance = axios.create({
    baseURL: host,
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = getAuthToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`
            config.headers.Accept = "application/json"
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)


export default axiosInstance