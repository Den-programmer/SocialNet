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
export const getPlaylists = (state: RootState) => {
    return state.musicPage.playlists
}

export const getCurrentTrack = (state: RootState) => {
    return state.musicPage.currentTrack
}

export const getVolume = (state: RootState) => {
    return state.musicPage.volume
}

export const getSingers = (state: RootState) => {
    return state.musicPage.following
}

export const getFilterTerm = (state: RootState) => {
    return state.musicPage.filter.term
}