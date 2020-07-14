import { instance, basicDataType } from './api'

type authType = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}
type loginType = {
    resultCode: number
    messages: Array<string>
    data: {
        userId?: number
    }
}

export const AuthAPI = {
    auth: () => {
        return instance.get<authType>(`auth/me`).then(response => {
            return response.data;
        });
    },
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha = null as string | null) => {
        return instance.post<loginType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => {
            return response.data;
        });
    },
    logout: () => {
        return instance.delete<basicDataType>(`auth/login`).then(response => {
            return response.data;
        });
    }
}