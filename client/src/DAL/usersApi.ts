import { instance, ServerResType } from './api'
import { userType } from '../types/FriendsType/friendsType'

type requestUsersDataType = {
    data: {
        items: Array<userType>
        totalCount: number
    }
    resultCode: number
    message: string
}

export const UsersAPI = {
    requestUsers: (pageSize: number, currentPage: number = 1, term: string = '') => {
        return instance.get<requestUsersDataType>(`api/users/getUsers/?pageSize=${pageSize}&currentPage=${currentPage}&term=${term}`).then(response => {
            return response.data
        })
    },
    follow: (userId: number) => {
        return instance.post<ServerResType<{}>>(`api/users/followUser/${userId}`).then(response => {
            return response.data
        })
    },
    unfollow: (userId: number) => {
        return instance.delete<ServerResType<{}>>(`api/users/unfollowUser/${userId}`).then(response => {
            return response.data
        })
    },
    requestFriends: (pageSize: number, currentPage: number = 1, term: string = '') => {
        return instance.get<requestUsersDataType>(`api/users/getFriends/?pageSize=${pageSize}&currentPage=${currentPage}&term=${term}`).then(response => {
            return response.data
        })
    }
}