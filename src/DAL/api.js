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
}
export const ProfileAPI = {
    getUsersProfile: userId => {
        return instance.get(`profile/${userId}`).then(response => {
            return response.data;
        });
    },
    auth: () => {
        return instance.get(`auth/me`).then(response => {
            return response.data;
        });
    }
}

