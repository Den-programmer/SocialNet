

export type userType = {
    id: string
    username: string
    profile: {
        photos: {
            large: string | File
            small: string | File
        }, 
        status: string
    }
    followed: boolean
}



export type FriendsFilter = {
    term: string
}

export type UsersInfType = {
    isFetching: boolean
    totalCount: number
    pageSize: number
    currentPage: number
}