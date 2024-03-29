import axios from 'axios'
import { contactsType, postType, profileType } from '../types/ProfileTypes/profileTypes'
import { instance } from './api'

export const ProfileAPI = {
    getUsersProfile: (userId: number | null) => {
        return instance.get(`api/profile/getProfile/${userId}`).then(res => {
            return res.data
        })
    },
    getUsername: (userId: number) => {
        return instance.get(`api/username/getUsername/${userId}`).then(res => {
            return res.data
        })
    },
    updateUsername: (userId: number, username: string) => {
        return instance.put(`api/username/saveUsername`, { userId, username }).then(rs => {
            return rs.data
        })
    },
    getUsersPosts: (userId: string) => {
        return instance.get(`api/posts/getPosts/${userId}`).then(res => {
            return res.data
        })
    },
    createPost: (userId: string, newPostTitle: string, newPostInformat: string, postPhoto: File) => {
        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('newPostTitle', newPostTitle)
        formData.append('newPostInformat', newPostInformat)
        formData.append('postPhoto', postPhoto)
        return instance.post(`api/posts/createPost`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(rs => {
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
    updateContacts: (contacts: contactsType, userId: any) => {
        return instance.put(`api/profile/contacts/updateContacts`, { contacts, userId }).then(res => {
            return res.data
        }).catch(error => {
            console.error("Error updating contacts:", error)
            throw error 
        })
    },
    updateAboutMe: (aboutMe: string, userId: any) => {
        return instance.put(`api/profile/aboutMe/updateAboutMe`, { aboutMe, userId }).then(res => {
            return res.data
        })
    },
    // getIsUserFollowed: (userId: number | null) => {
    //     return instance.get(`follow/${userId}`)
    // },
    getGender: (userId: number) => {
        return instance.get(`api/gender/getGender/${userId}`).then(res => {
            return res.data
        })
    },
    updateGender: (gender: string, userId: number) => {
        return instance.put(`api/gender/updateGender`, { gender, userId }).then(res => {
            return res.data
        })
    }
}