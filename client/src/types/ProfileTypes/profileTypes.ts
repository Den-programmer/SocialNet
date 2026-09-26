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
    website?: string | null
    vk?: string | null
    mainLink?: string | null
}

export type profileType = {
    status: string
    aboutMe: string
    contacts: contactsType
    photos: profilePhotosType
    userId: string
}

export type PostCommentType = {
  id: string
  author: string
  text: string
  createdAt: string
}

export type PostType = {
  _id: string
  postTitle: string
  postInf: string
  postImg: File | string
  likesCount: number
  likedByViewer?: boolean
  comments?: PostCommentType[]
  repostsCount?: number
  visibility?: 'public' | 'private'
  owner: string
  createdAt: string
  canDelete?: boolean
  canInteract?: boolean
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