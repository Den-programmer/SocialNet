export type trackType = {
    id: number
    singer: string
    singerPhoto: string
    song: string
    src: string
    duration: number
    time: number
    liked: boolean
    isMusicPlaying: boolean
}

export type albumType = {

}

export type singerType = {
    id: number
    photoSinger: string
    name: string
    location: string | null
    subscribers: number
    music: Array<trackType>
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