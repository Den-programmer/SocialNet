import { RootState } from "../redux"

export const selectSecurityCaptcha = (state: RootState) => {
    return state.auth.captchaUrl
}