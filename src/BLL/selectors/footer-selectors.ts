import { RootState } from '../redux'

export const getFootLinks = (state: RootState) => {
    return state.Footer.footLinks
}

export const getYear = (state: RootState) => {
    return state.Footer.year
}

export const getFootInf = (state: RootState) => {
    return state.Footer.footInf
}