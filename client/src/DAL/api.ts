import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/",
    headers: {
        'Content-Type': 'application/json'
    }
})

const getToken = () => {
    const token = localStorage.getItem('token')
    return token
}

instance.interceptors.request.use(
    config => {
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export type ServerResType<T> = {
    resultCode: number
    message: string
    data: T
}

export enum resultCode {
    Success = 0,
    Error = 1,
}
export enum captchaCode {
    captchaIsRequired = 10
}