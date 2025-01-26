import axios from 'axios'
import { instance, ServerResType } from './api'

type loginType = {
    userId: string
    token: string | null
}

export const AuthAPI = {
    register: (email: string | null,
         username: string | null, 
         password: string | null, 
         rememberMe: boolean, 
         captcha = null as string | null) => {
        return instance.post<ServerResType<loginType>>(`api/auth/register`, {
            email,
            username,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha = null as string | null) => {
        return instance.post<ServerResType<loginType>>(`api/auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    }
}