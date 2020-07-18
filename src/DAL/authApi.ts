import { instance, ServerResType } from './api'

type authType = {
    id: number
    email: string
    login: string 
}
type loginType = {
    userId: number
}

export const AuthAPI = {
    auth: () => {
        return instance.get<ServerResType<authType>>(`auth/me`).then(response => {
            return response.data
        })
    },
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha = null as string | null) => {
        return instance.post<ServerResType<loginType>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => {
            return response.data
        })
    },
    logout: () => {
        return instance.delete<ServerResType<{}>>(`auth/login`).then(response => {
            return response.data
        })
    }
}