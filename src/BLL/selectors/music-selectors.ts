import { RootState } from '../redux'

export const getMusicPageNavLinks = (state: RootState) => {
    return state.musicPage.navLinks
}
export const getTracks = (state: RootState) => {
    return state.musicPage.tracks
}

export const getTrackNotifications = (state: RootState) => {
    return state.musicPage.trackNotifications
}

export const getLikedTracks = (state: RootState) => {
    return state.musicPage.likedTracks
}