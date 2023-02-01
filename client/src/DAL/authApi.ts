import axios from 'axios'
import { instance, ServerResType } from './api'

type authType = {
    id: number
    email: string
    login: string 
}
type loginType = {
    userId: number
    token: string | null
}

export const AuthAPI = {
    // auth: () => {
    //     return instance.get<ServerResType<authType>>(`auth/me`).then(response => {
    //         return response.data
    //     })
    // },
    register: (email: string | null,
         username: string | null, 
         password: string | null, 
         rememberMe: boolean, 
         captcha = null as string | null) => {
        return axios.post<ServerResType<loginType>>(`api/auth/register`, {
            email,
            username,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha = null as string | null) => {
        debugger
        return axios.post<ServerResType<loginType>>(`api/auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout: () => {
        return instance.delete<ServerResType<{}>>(`auth/login`).then(response => {
            return response.data
        })
    }
}