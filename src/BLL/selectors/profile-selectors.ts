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
export const getIsAddPostModalOpenStatus = (state: RootState) => {
    return state.profilePage.isAddPostModalOpen
}
export const getIsPostModalOpenStatus = (state: RootState) => {
    return state.profilePage.isPostModalOpen
}

export const getUserBackground = (state: RootState) => {
    return state.profilePage.background
}

export const getProfileNavigationMenu = (state: RootState) => {
    return state.profilePage.profileNavigationMenu
}

export const getBiography = (state: RootState) => {
    return state.profilePage.profile.aboutMe
} 

export const getGender = (state: RootState) => {
    return state.profilePage.gender
}

export const getChangePhotosMenu = (state: RootState) => {
    return state.profilePage.changePhotosMenu
}

export const getChangePhotosMenuItemId = (state: RootState) => {
    return state.profilePage.changePhotosMenuItemId
}