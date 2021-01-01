import { instance, ServerResType } from './api'
import { userType } from '../types/FriendsType/friendsType'

type requestUsersDataType = {
    items: Array<userType>
    totalCount: number
    error: string
}

export const UsersAPI = {
    requestUsers: (pageSize: number, currentPage: number, term: string = '') => {
        return instance.get<requestUsersDataType>(`users?count=${pageSize}&page=${currentPage}&term=${term}`).then(response => {
            return response.data
        })
    },
    follow: (userId: number) => {
        return instance.post<ServerResType<{}>>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(response => {
            return response.data
        })
    },
    unfollow: (userId: number) => {
        return instance.delete<ServerResType<{}>>(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`).then(response => {
            return response.data
        })
    }
}