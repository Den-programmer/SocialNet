export type profilePhotosType = {
    large: string | undefined | File
    small: string | undefined | File
}
export type contactsType = {
    facebook: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    linkedin: string | null
}

export type profileType = {
    status: string
    aboutMe: string
    contacts: contactsType
    photos: profilePhotosType
    userId: string
}

export type PostType = {
  id: string
  _id: string
  postTitle: string
  postInf: string
  postImg: File | string
  likesCount: number
  owner: string
  createdAt: string
}

export type PostEditState = {
  isEditing: boolean
  draftTitle: string
  draftInf: string
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