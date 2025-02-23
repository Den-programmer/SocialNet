export type profilePhotosType = {
    large: string | undefined | File
    small: string | undefined | File
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

export type profileType = {
    status: string
    aboutMe: string
    contacts: contactsType
    photos: profilePhotosType
    userId: string
}

export type postType = {
    id: number
    postTitle: string
    postInf: string
    postImg: File | string
    likesCount: number
    isEditTitle: boolean
    isEditPostInf: boolean
    owner: string
    createdAt: string
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