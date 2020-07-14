import { RootState } from "../redux"

export const getSecurityCaptcha = (state: RootState) => {
    return state.auth.captchaUrl
}