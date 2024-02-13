import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/"
})

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