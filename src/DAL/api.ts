import axios from 'axios';
import { profileType } from '../BLL/reducer-profile';
import { userType } from '../types/FriendsType/friendsType';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "84df6f8d-3114-43eb-bbd6-9f107dc49f3e"
    }
});

type basicDataType = {
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

type requestUsersDataType = {
    items: Array<userType>
    totalCount: number
    error: string
}

export const UsersAPI = {
    requestUsers: (pageSize: number, currentPage: number) => {
        return instance.get<requestUsersDataType>(`users?count=${pageSize}&page=${currentPage}`).then(response => {
            return response.data;
        });
    },
    follow: (userId: number) => {
        return instance.post<basicDataType>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(response => {
            return response.data;
        });
    },
    unfollow: (userId: number) => {
        return instance.delete<basicDataType>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(response => {
            return response.data;
        });
    }
}

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

type userPhotoResType = {
    data: {
        small: string
        large: string
    }
    resultCode: number
    messages: Array<string>
}

export const OptionsAPI = {
    setUserPhoto: (photo: any) => {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put<userPhotoResType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        });
    }
}

type captchaUrlType = { url: string }

export const SecurityAPI = {
    getCaptchaUrl: () => {
        return instance.get<captchaUrlType>(`/security/get-captcha-url`).then(response => {
            return response.data;
        });
    }
}