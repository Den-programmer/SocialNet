

export type userType = {
    id: any
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