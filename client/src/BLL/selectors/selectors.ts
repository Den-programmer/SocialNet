import { RootState } from '../redux'

export const getAppInitializationStatus = (state: RootState) => {
    return state.app.isInitialized
}
export const getMessageError = (state: RootState) => {
    return state.app.messageError
}
export const getIsModalOpenStatus = (state: RootState) => {
    return state.app.isModalOpen
}
export const getDate = (state: RootState) => {
    return state.app.date
}