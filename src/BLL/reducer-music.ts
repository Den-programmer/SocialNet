// @ts-ignore
import savethatshit from '../components/Article/Music/MainMusicPage/track/music/SaveThatShit.mp3'
// @ts-ignore
import deathpunch from '../components/Article/Music/MainMusicPage/track/music/DeathPunch.mp3'
// @ts-ignore
import mydemons from '../components/Article/Music/MainMusicPage/track/music/MyDemons.mp3'
// @ts-ignore
import TherapySession from '../components/Article/Music/MainMusicPage/track/music/Therapy_Session.mp3'
import nf from '../components/Article/Music/Following/singer/images/nf.jpg'
import suicideBoys from '../components/Article/Music/Following/singer/images/suicideBoys.jpg'
import { InferActionTypes, RootState } from './redux'
import { ThunkAction } from 'redux-thunk'
import { MusicAPI } from '../DAL/musicApi'
import { trackType } from '../types/MusicTypes/musicTypes'

export type singerType = {
    id: number
    photoSinger: string
    name: string
    location: string | null
    subscribers: number
    music: Array<trackType>
    followed: boolean
}

export type playlistType = {
    id: number
    title: string
    music: Array<trackType>
    count: number
}

export type trackNotificationType = {
    id: number
    title: string
}
export type navLinkType = {
    id: number
    title: string
    path: string
}

const musicPage = {
    navLinks: [
        {
            id: 7004,
            title: 'Music',
            path: '/Music'
        },
        {
            id: 7008,
            title: 'Liked Tracks',
            path: '/Music/likedTracks'
        },
        {
            id: 7009,
            title: 'PlayLists',
            path: '/Music/PlayLists'
        },
        {
            id: 7010,
            title: 'Albums',
            path: '/Music/Albums'
        },
        {
            id: 7011,
            title: 'Following',
            path: '/Music/following'
        }
    ],
    trackNotifications: [
        {
            id: 1,
            title: 'Add to playlist'
        },
        {
            id: 2,
            title: 'Ignore track'
        },
        {
            id: 3,
            title: 'Notification2'
        },
        {
            id: 4,
            title: 'Notification3'
        },
        {
            id: 5,
            title: 'Share'
        },
    ],
    tracks: [
        {
            id: 1,
            singer: 'Lil Peep',
            singerPhoto: 'data:image/jpeg;base64,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',
            song: 'Save that shit',
            src: savethatshit,
            duration: 5,
            time: 0,
            liked: true,
            isMusicPlaying: false
        },
        {
            id: 2,
            singer: 'Scarlxrd',
            singerPhoto: 'https://i.ytimg.com/vi/DnsoxwrDsEk/maxresdefault.jpg',
            song: 'DeathPunch',
            src: deathpunch,
            duration: 4,
            time: 0,
            liked: true,
            isMusicPlaying: false
        },
        {
            id: 3,
            singer: 'Starset',
            singerPhoto: 'data:image/jpeg;base64,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',
            song: 'My Demons',
            src: mydemons,
            duration: 5,
            time: 0,
            liked: true,
            isMusicPlaying: false
        },
        {
            id: 4,
            singer: 'NF',
            singerPhoto: nf,
            song: 'Therapy Session',
            src: TherapySession,
            duration: 5,
            time: 0,
            liked: true,
            isMusicPlaying: false
        }
    ],
    likedTracks: [] as Array<trackType>,
    playlists: [
        {
            id: 1,
            title: 'The First Playlist',
            music: [],
            count: 0
        },
        {
            id: 2,
            title: 'The Second Playlist',
            music: [
                {
                    id: 1,
                    singer: 'Lil Peep',
                    singerPhoto: 'https://outstyle.org/images/news/5/7/6/unnamed.jpg',
                    song: 'Save that shit',
                    src: savethatshit,
                    duration: 5,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                },
                {
                    id: 2,
                    singer: 'Scarlxrd',
                    singerPhoto: 'https://i.ytimg.com/vi/DnsoxwrDsEk/maxresdefault.jpg',
                    song: 'DeathPunch',
                    src: deathpunch,
                    duration: 4,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                },
                {
                    id: 3,
                    singer: 'Starset',
                    singerPhoto: 'data:image/jpeg;base64,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',
                    song: 'My Demons',
                    src: mydemons,
                    duration: 5,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                },
                {
                    id: 4,
                    singer: 'NF',
                    singerPhoto: nf,
                    song: 'Therapy Session',
                    src: TherapySession,
                    duration: 5,
                    time: 0,
                    liked: true,
                    isMusicPlaying: false
                }
            ],
            count: 4
        }
    ],
    albums: [],
    following: [
        {
            id: 1,
            photoSinger: nf,
            name: 'NF',
            location: 'United States',
            subscribers: 5000000,
            music: [] as Array<trackType>,
            followed: false
        },
        {
            id: 2,
            photoSinger: 'https://outstyle.org/images/news/5/7/6/unnamed.jpg',
            name: 'Lil Peep',
            location: 'United States',
            subscribers: 4900000,
            music: [] as Array<trackType>,
            followed: false
        },
        {
            id: 3,
            photoSinger: 'data:image/jpeg;base64,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',
            name: 'Starset',
            location: null,
            subscribers: 5900000,
            music: [] as Array<trackType>,
            followed: false
        },
        {
            id: 4,
            photoSinger: suicideBoys,
            name: '$uicide boy$',
            location: 'United States',
            subscribers: 2900000,
            music: [] as Array<trackType>,
            followed: false
        }
    ] as Array<singerType>,
    currentTrack: {
        id: 1,
        singer: 'Lil Peep',
        singerPhoto: 'data:image/jpeg;base64,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',
        song: 'Save that shit',
        src: savethatshit,
        duration: 5,
        time: 0,
        liked: true,
        isMusicPlaying: false
    },
    volume: 1,
    filter: {
        term: ''
    }
}

const reducerMusic = (state = musicPage, action: ActionTypes): typeof musicPage => {
    switch (action.type) {
        case `sn/musicPage/SET_TRACKS`:
            return {
                ...state,
                tracks: action.tracks
            }
        case `sn/musicPage/LIKE_TRACK`:
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    if (track.id === action.trackId) {
                        if (track.liked) return { ...track, liked: false }
                        return { ...track, liked: true }
                    } else {
                        return track
                    }
                }),
                currentTrack: { ...state.currentTrack, liked: !state.currentTrack.liked }
            }
        case `sn/musicPage/SET_LIKED_TRACKS`:
            return {
                ...state,
                likedTracks: state.tracks.filter((track: trackType) => {
                    if (track.liked) return true
                })
            }
        case `sn/musicPage/CHOOSE_TRACK`:
            let trackObj = state.currentTrack
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    if (track.id === action.trackId) {
                        trackObj = { ...track, isMusicPlaying: !track.isMusicPlaying }
                        return { ...track, isMusicPlaying: !track.isMusicPlaying }
                    } else {
                        return { ...track, isMusicPlaying: false }
                    }
                }),
                currentTrack: trackObj
            }
        case `sn/musicPage/SET_CURRENT_TRACK`:
            return {
                ...state,
                // @ts-ignore
                currentTrack: state.tracks.filter((track: trackType) => {
                    if (track.id === action.trackId) return true
                }).find((track: trackType) => track)
            }
        case `sn/musicPage/SET_CURRENT_TRACK_TIME`:
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    if (track.id === action.trackId) return { ...track, time: action.time }
                    return track
                }),
                currentTrack: { ...state.currentTrack, time: action.time }
            }
        case `sn/musicPage/PAUSE_ALL_TRACKS`:
            return {
                ...state,
                tracks: state.tracks.map((track: trackType) => {
                    return { ...track, isMusicPlaying: false }
                }),
                currentTrack: { ...state.currentTrack, isMusicPlaying: false }
            }
        case `sn/musicPage/ADD_PLAYLIST`:
            const newPlaylist = {
                id: state.playlists.length + 1,
                title: action.title === '' ? 'Untitled' : action.title,
                music: [],
                count: 0
            }
            return {
                ...state,
                playlists: [...state.playlists, newPlaylist]
            }
        case `sn/musicPage/DELETE_PLAYLIST`:
            return {
                ...state,
                playlists: state.playlists.filter((playlist: playlistType) => {
                    if (playlist.id !== action.playlistId) return true
                })
            }
        case `sn/musicPage/EDIT_PLAYLIST`:
            return {
                ...state,
                playlists: state.playlists.map((playlist: playlistType) => {
                    if (playlist.id === action.playlistId) return { ...playlist, title: action.newTitle === '' ? 'Untitled' : action.newTitle }
                    return playlist
                })
            }
        case `sn/musicPage/ADD_TRACK_TO_PLAYLIST`:
            const newTrack = state.tracks.filter((t: trackType) => {
                if (t.id === action.trackId) return true
            }).find(track => track)
            return {
                ...state,
                // @ts-ignore
                playlists: state.playlists.map((p: playlistType) => {
                    if (p.id === action.playlistId) return {
                        ...p, music: state.playlists[action.playlistId - 1].music.map((track: trackType) => {
                            if (track.id !== action.trackId) {
                                // @ts-ignore
                                state.playlists[action.playlistId - 1].music.push(newTrack)
                            }
                            else {
                                //set error message as true! 
                                return track
                            }
                        }),
                        count: state.playlists[action.playlistId - 1].music.length
                    }
                    return p
                })
            }
        case `sn/musicPage/SET_VOLUME`:
            return {
                ...state,
                volume: action.volume
            }
        case `sn/musicPage/SET_SINGER_FOLLOWED_STATUS`:
            return {
                ...state,
                following: state.following.map((item: singerType) => {
                    if(item.name === action.singerName) return { ...item, followed: !item.followed }
                    return item
                })
            } 
        case `sn/musicPage/SET_FILTER_TERM`:
            return {
                ...state, 
                filter: { ...state.filter, term: action.term }
            }       
        // case `sn/musicPage/IGNORE-TRACK`: 
        //     return {
        //         ...state,
        //         tracks: state.tracks.map((track: trackType) => {
        //             if(track.id === action.trackId) {
        //                 if(track.isMusicPlaying && state.tracks.length >= action.trackId + 1) {
        //                     return { ...state.tracks[action.trackId + 2], isMusicPlaying: true }
        //                 } else if(track.isMusicPlaying && state.tracks.length <= action.trackId) {
        //                     return { ...state.tracks[0], isMusicPlaying: true }
        //                 } else {
        //                     return track
        //                 }
        //             }
        //             return track
        //         }).filter((track: trackType) => {
        //             if(track.id !== action.trackId)  return true
        //         })
        //     }      
        default:
            return state
    }
}

// ignore track - относиться к currentTrack, если удаляеться трек равный текущему треку - мы должны заменить current track
// на следующий по id или на первый если тот трек был последним!

// Action Creators!

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    setTracks: (tracks: Array<trackType>) => ({ type: `sn/musicPage/SET_TRACKS`, tracks } as const),
    likeTrack: (trackId: number) => ({ type: `sn/musicPage/LIKE_TRACK`, trackId } as const),
    setLikedTracks: () => ({ type: `sn/musicPage/SET_LIKED_TRACKS` } as const),
    chooseTrack: (trackId: number) => ({ type: `sn/musicPage/CHOOSE_TRACK`, trackId } as const),
    setCurrentTrack: (trackId: number) => ({ type: `sn/musicPage/SET_CURRENT_TRACK`, trackId } as const),
    setTrackCurrentTime: (trackId: number, time: number) => ({ type: `sn/musicPage/SET_CURRENT_TRACK_TIME`, trackId, time } as const),
    unsetIsMusicPlaying: () => ({ type: `sn/musicPage/PAUSE_ALL_TRACKS` } as const),
    addPlaylist: (title: string) => ({ type: `sn/musicPage/ADD_PLAYLIST`, title } as const),
    deletePlaylist: (playlistId: number) => ({ type: `sn/musicPage/DELETE_PLAYLIST`, playlistId } as const),
    changePlaylistTitle: (newTitle: string, playlistId: number) => ({ type: `sn/musicPage/EDIT_PLAYLIST`, newTitle, playlistId } as const),
    addTrackToPlaylist: (trackId: number, playlistId: number) => ({ type: `sn/musicPage/ADD_TRACK_TO_PLAYLIST`, trackId, playlistId } as const),
    ignoreTrack: (trackId: number) => ({ type: `sn/musicPage/IGNORE-TRACK`, trackId } as const),
    setVolume: (volume: number) => ({ type: `sn/musicPage/SET_VOLUME`, volume } as const),
    setSingerFollewedStatus: (singerName: string) => ({ type: `sn/musicPage/SET_SINGER_FOLLOWED_STATUS`, singerName } as const),
    setFilterTerm: (term: string) => ({ type: `sn/musicPage/SET_FILTER_TERM`, term } as const)
}

// Thunk Creators!

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>

export const requireTracks = (): ThunkType => async (dispatch) => {
    const data = await MusicAPI.getTracks()
    console.log(data)
}

export default reducerMusic