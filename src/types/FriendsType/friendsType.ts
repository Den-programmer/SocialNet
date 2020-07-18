export type userType = {
    id: number
    name: string
    nickname: string
    photos: {
        large: string
        small: string
    }
    status: null | string
    followed: boolean
}