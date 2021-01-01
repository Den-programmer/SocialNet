import { RootState } from "../redux"

export const getFriends = (state: RootState) => {
    return state.Friends.friends 
}

export const getUsersInf = (state: RootState) => {
    return state.Friends.usersInf
}
 
export const getUsers = (state: RootState) => {
    return state.Friends.users
}

export const getFollowingInProcess = (state: RootState) => {
    return state.Friends.followingInProcess
}  

export const getUsersFilter = (state: RootState) => {
    return state.Friends.filter
}