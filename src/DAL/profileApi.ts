import { instance, basicDataType } from './api'
import { profileType } from '../BLL/reducer-profile'

export const ProfileAPI = {
    getUsersProfile: (userId:number | null) => {
        return instance.get<profileType>(`profile/${userId}`).then(response => {
            return response.data;
        });
    },
    getStatus: (userId:number)  => {
        return instance.get<string>(`profile/status/${userId}`).then(response => {
            return response.data;
        });
    },
    updateStatus: (status:string) => {
        return instance.put<string>(`profile/status`, { status }).then(response =>{
            return response.data;
        });
    },
    saveProfile: (profile: profileType) => {
        return instance.put<basicDataType>(`/profile`, profile).then(response => {
            return response.data;
        });
    }
}