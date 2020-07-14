import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "84df6f8d-3114-43eb-bbd6-9f107dc49f3e"
    }
});

export type basicDataType = {
    resultCode: number
    messages: Array<string>
    data: {
        userId?: number
    }
}

export enum resultCode {
    Success = 0,
    Error = 1,
}
export enum captchaCode {
    captchaIsRequired = 10
}