import { RootState } from '../redux'

export const selectFootLinks = (state: RootState) => {
    return state.Footer.footLinks
}

export const selectYear = (state: RootState) => {
    return state.Footer.year
}

export const selectFootInf = (state: RootState) => {
    return state.Footer.footInf
}