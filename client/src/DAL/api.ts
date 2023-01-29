import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": process.env.API_KEY_SAMURAI
    }
})

// export const newsInstance = axios.create({
//     withCredentials: true,
//     baseURL: "https://newsapi.org/v2/",
//     headers: {
//         "API-KEY": process.env.API_KEY_NEWS
//     }
// })
// export const musicInstance = axios.create({
//     withCredentials: true,
//     baseURL: "Spotifystefan-skliarovV1.p.rapidapi.com/",
//     headers: {
//         "API-KEY": "d263356472mshac963836e75559dp1e3224jsn8b094fb8d14e"
//     }
// })

// export const newsInstance = axios.create({
//     withCredentials: true,
//     baseURL: "http://api.mediastack.com/v1/",
//     headers: {
//         "API-KEY": "53c79c5d8ba919d4a7a133f737a799d8"
//     }
// })

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