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
    requestUsers: (pageSize: number, currentPage: number, term: string = '') => {
        return instance.get<requestUsersDataType>(`api/users/getUsers/${pageSize}/${currentPage}/${term}`).then(response => {
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