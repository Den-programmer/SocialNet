import { RootState } from "../redux"

export const selectUsersProfile = (state: RootState) => {
    return state.profilePage.profile 
}
export const selectPosts = (state: RootState) => {
    return state.profilePage.posts 
}
export const selectUsersSmallPhoto = (state: RootState) => {
    return state.profilePage.profile.photos.small
}

export const selectUsersName = (state: RootState) => {
    return state.profilePage.username
}

export const selectContacts = (state: RootState) => {
    return state.profilePage.profile.contacts
}
export const selectIsUserFollowedStatus = (state: RootState) => {
    return state.profilePage.followed
}
export const selectIsAddPostModalOpenStatus = (state: RootState) => {
    return state.profilePage.isAddPostModalOpen
}
export const selectIsPostModalOpenStatus = (state: RootState) => {
    return state.profilePage.isPostModalOpen
}

export const selectUserBackground = (state: RootState) => {
    return state.profilePage.background
}

export const selectProfileNavigationMenu = (state: RootState) => {
    return state.profilePage.profileNavigationMenu
}

export const selectBiography = (state: RootState) => {
    return state.profilePage.profile.aboutMe
} 

export const selectGender = (state: RootState) => {
    return state.profilePage.gender
}

export const selectChangePhotosMenu = (state: RootState) => {
    return state.profilePage.changePhotosMenu
}

export const selectChangePhotosMenuItemId = (state: RootState) => {
    return state.profilePage.changePhotosMenuItemId
}

export const selectIsMembersColumnOpenedStatus = (state: RootState) => {
    return state.profilePage.isMembersColumnOpen
}

export const selectIsLoadingSmthStatus = (state: RootState) => {
    return state.app.isSmthLoading
}