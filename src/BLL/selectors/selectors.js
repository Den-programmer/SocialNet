export const getAppInitializationStatus = (state) => {
    return state.app.isInitialized;
}

export const getUsersProfile = (state) => {
    return state.profilePage.profile 
}

export const getPosts = (state) => {
    return state.profilePage.posts 
}

export const getFriends = (state) => {
    return state.Friends.friends 
}

export const getAuthorizedUserId = (state) => {
    return state.profilePage.profile.userId 
}

export const getDialogsData = (state) => {
    return state.messagesPage.dialogsData
}

export const getMessages = (state) => {
    return state.messagesPage.messages
}

export const getUsersSmallPhoto = (state) => {
    return state.profilePage.profile.photos.small
}

export const getUsersName = (state) => {
    return state.profilePage.profile.fullName
}

export const getContacts = (state) => {
    return state.profilePage.profile.contacts
}

export const getUsersInf = (state) => {
    return state.Friends.usersInf
}
 
export const getUsers = (state) => {
    return state.Friends.users
}

export const getFollowingInProcess = (state) => {
    return state.Friends.followingInProcess
}    

export const getFootLinks = (state) => {
    return state.Footer.footLinks
}

export const getYear = (state) => {
    return state.Footer.year
}

export const getFootInf = (state) => {
    return state.Footer.footInf
}

export const getLoginName = (state) => {
    return state.auth.login
}

export const getIsAuthStatus = (state) => {
    return state.auth.isAuth;
}

