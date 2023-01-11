import { RootState } from "../redux"

export const getAuthorizedUserId = (state: RootState) => {
    return state.auth.userId 
}
export const getLoginName = (state: RootState) => {
    return state.auth.login
}
export const getIsAuthStatus = (state: RootState) => {
    return state.auth.isAuth;
}

export const getLastUrl = (state: RootState) => {
    return state.auth.lastUrl
}