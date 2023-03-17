import axios from 'axios'
import { profileType } from '../types/ProfileTypes/profileTypes'
import { instance } from './api'

export const ProfileAPI = {
    getUsersProfile: (userId:number | null) => {
        return instance.get(`api/profile/${userId}`).then(res => {
            return res.data
        })
    },
    getUsername: (userId: number) => {
        return instance.get(`api/username/${userId}`).then(res => {
            return res.data
        })
    },
    updateUsername: (userId: number, username: string) => {
        return instance.put(`api/username`, { userId, username }).then(rs => {
            return rs.data
        })
    },
    // getStatus: (userId:number)  => {
    //     return instance.get<string>(`profile/status/${userId}`).then(response => {
    //         return response.data
    //     })
    // },
    // updateStatus: (status:string) => {
    //     return instance.put<string>(`profile/status`, { status }).then(response =>{
    //         return response.data
    //     })
    // },
    saveProfile: (profile: profileType) => {
        debugger
        return instance.put(`api/profile`, { profile }).then(res => {
            return res.data
        })
    },
    // getIsUserFollowed: (userId: number | null) => {
    //     return instance.get(`follow/${userId}`)
    // },
    getGender: (userId: number) => {
        return instance.get(`api/gender/${userId}`).then(res => {
            return res.data
        })
    },
    updateGender: (gender: string, userId: number) => {
        return instance.put(`api/gender`, { gender, userId }).then(res => {
            return res.data
        })
    }
}