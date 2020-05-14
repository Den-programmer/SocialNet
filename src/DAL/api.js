import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "84df6f8d-3114-43eb-bbd6-9f107dc49f3e"
    }
});

export const UsersAPI = {
    getUsers: (pageSize, currentPage) => {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => {
            return response.data;
        });
    },
    follow: (userId) => {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(response => {
            return response.data;
        });
    },
    unfollow: (userId) => {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(response => {
            return response.data;
        });
    }
}
export const ProfileAPI = {
    getUsersProfile: userId => {
        return instance.get(`profile/${userId}`).then(response => {
            return response.data;
        });
    },
    getStatus: (userId)  => {
        return instance.get(`profile/status/${userId}`).then(response => {
            return response.data;
        });
    },
    updateStatus: (status) => {
        return instance.put(`profile/status`, { status }).then(response =>{
            return response.data;
        });
    }
}
export const AuthAPI = {
    auth: () => {
        return instance.get(`auth/me`).then(response => {
            return response.data;
        });
    }
}
