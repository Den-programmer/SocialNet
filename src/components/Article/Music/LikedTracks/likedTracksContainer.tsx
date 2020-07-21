import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getLikedTracks, getTrackNotifications } from '../../../../BLL/selectors/music-selectors'
import MainMusicPage from '../MainMusicPage/mainMusicPage'
import { likeTrack, chooseTrack, setTrackCurrentTime, setLikedTracks, trackType } from '../../../../BLL/reducer-music'
import { IMainMusicPageProps } from '../MainMusicPage/mainMusicPage'

interface IProps extends IMainMusicPageProps {
    setLikedTracks: () => void
}

class LikedTracksClass extends React.Component<IProps> {
    componentDidMount() {
        this.props.setLikedTracks()
        this.props.tracks.forEach((track: trackType) => {
            if(track.isMusicPlaying) {
                
            }
        })
        // Тут мы должны запускать музыку, если она играет!
    }
    render() {
        return <MainMusicPage tracks={this.props.tracks} trackNotifications={this.props.trackNotifications} likeTrack={this.props.likeTrack}
        chooseTrack={this.props.chooseTrack} setTrackCurrentTime={this.props.setTrackCurrentTime}/>
    }
}

const mapStateToProps = (state:RootState) => ({
    tracks: getLikedTracks(state),
    trackNotifications: getTrackNotifications(state)
})

const LikedTracksContainer = connect(mapStateToProps, { likeTrack, chooseTrack, setTrackCurrentTime, setLikedTracks })(LikedTracksClass)

export default LikedTracksContainer