import { RootState } from '../redux'

export const getAppInitializationStatus = (state: RootState) => {
    return state.app.isInitialized;
}
export const getAppFontSize = (state: RootState) => {
    return state.app.options.appFontSize
}
export const getMessageError = (state: RootState) => {
    return state.app.messageError;
}
