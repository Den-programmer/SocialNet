import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "84df6f8d-3114-43eb-bbd6-9f107dc49f3e"
    }
})
export const musicInstance = axios.create({
    withCredentials: true,
    baseURL: "Spotifystefan-skliarovV1.p.rapidapi.com/",
    headers: {
        "API-KEY": "d263356472mshac963836e75559dp1e3224jsn8b094fb8d14e"
    }
})

export type ServerResType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export enum resultCode {
    Success = 0,
    Error = 1,
}
export enum captchaCode {
    captchaIsRequired = 10
}