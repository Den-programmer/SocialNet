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

type requestFollowedUsersData = {
    data: {
        following: Array<string>
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
    follow: (userId: string) => {
        return instance.post<ServerResType<{}>>(`api/users/followUser/${userId}`).then(response => {
            return response.data
        })
    },
    unfollow: (userId: string) => {
        return instance.delete<ServerResType<{}>>(`api/users/unfollowUser/${userId}`).then(response => {
            return response.data
        })
    },
    requestFriends: () => {
        return instance.get<requestFollowedUsersData>(`api/users/getFriends`).then(response => {
            return response.data
        })
    }
}