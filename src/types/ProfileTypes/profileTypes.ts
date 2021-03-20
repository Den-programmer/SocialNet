export type profilePhotosType = {
    large: string
    small: string
}
export type contactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export type saveProfileType = {
    fullName: string
    contacts: contactsType
}

export type profileType = {
    status: string
    aboutMe: null | string
    contacts: contactsType
    fullName: string
    photos: profilePhotosType
    userId: number
}

export type postType = {
    id: number
    postTitle: string
    postInf: string
    postImg: string
    likesCount: number
}

export type postNotificationType = {
    id: number
    name: string
}

export type profileNavItem = {
    id: number
    title: string
    isChosen: boolean
    path: string
}

export type ChangePhotosMenuItemType = {
    id: number
    title: string
    isActive: boolean
}