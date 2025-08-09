import { RootState } from "../redux"

export const selectFriends = (state: RootState) => {
    return state.Friends.friends 
}

export const selectUsersInf = (state: RootState) => {
    return state.Friends.usersInf
}
 
export const selectUsers = (state: RootState) => {
    return state.Friends.users
}

export const selectFollowingInProcess = (state: RootState) => {
    return state.Friends.followingInProcess
}  

export const selectUsersFilter = (state: RootState) => {
    return state.Friends.filter
}

export const selectBlacklist = (state: RootState) => {
    return state.Friends.blacklist
}