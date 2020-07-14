import { instance, basicDataType } from './api'
import { userType } from '../types/FriendsType/friendsType'

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