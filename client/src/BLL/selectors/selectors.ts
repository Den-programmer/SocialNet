import { RootState } from '../redux'

export const selectAppInitializationStatus = (state: RootState) => {
    return state.app.isInitialized
}
export const selectMessageError = (state: RootState) => {
    return state.app.messageError
}
export const selectIsModalOpenStatus = (state: RootState) => {
    return state.app.isModalOpen
}
export const selectDate = (state: RootState) => {
    return state.app.date
}
export const selectHeaderHeight = (state: RootState) => {
    return state.app.headerHeight
}