import { RootState } from "../redux"

export const selectAuthorizedUserId = (state: RootState) => {
    return state.auth.userId 
}
export const selectIsAuthStatus = (state: RootState) => {
    return state.auth.isAuth;
}

export const selectLastUrl = (state: RootState) => {
    return state.auth.lastUrl
}

export const selectIsRegisterStatus = (state: RootState) => {
    return state.auth.isRegister
}

export const selectCaptchaUrl = (state: RootState) => {
    return state.auth.captchaUrl
}
