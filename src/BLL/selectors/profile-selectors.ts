import { RootState } from "../redux"

export const getUsersProfile = (state: RootState) => {
    return state.profilePage.profile 
}
export const getPosts = (state: RootState) => {
    return state.profilePage.posts 
}
export const getUsersSmallPhoto = (state: RootState) => {
    return state.profilePage.profile.photos.small
}

export const getUsersName = (state: RootState) => {
    return state.profilePage.profile.fullName
}

export const getContacts = (state: RootState) => {
    return state.profilePage.profile.contacts
}
export const getIsUserFollowedStatus = (state: RootState) => {
    return state.profilePage.followed
}