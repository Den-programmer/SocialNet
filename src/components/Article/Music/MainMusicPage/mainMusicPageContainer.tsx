import React from 'react'
import { connect } from 'react-redux'
import MainMusicPage from './mainMusicPage'
import { RootState } from '../../../../BLL/redux'
import { getFilterTerm, getTracks, getVolume } from '../../../../BLL/selectors/music-selectors'
import { actions, requireTracks } from '../../../../BLL/reducer-music'
import { trackType } from '../../../../types/MusicTypes/musicTypes'
import { getCurrentTrack } from '../../../../BLL/selectors/music-selectors'
import { compose } from 'redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'

interface IMainMusicPageContainer {
    term: string
    tracks: Array<trackType>
    currentTrack: trackType
    volume: number
    setTrackCurrentTime: (trackId: number, time: number) => void
    unsetIsMusicPlaying: () => void
    requireTracks: () => void
    chooseTrack: (trackId: number) => void
}

class MainMusicPageContainer extends React.Component<IMainMusicPageContainer> {
    // componentDidMount() {
    //     this.props.requireTracks()
    // }
    render() {
        return <MainMusicPage term={this.props.term} chooseTrack={this.props.chooseTrack} volume={this.props.volume} tracks={this.props.tracks} 
        currentTrack={this.props.currentTrack} 
        setTrackCurrentTime={this.props.setTrackCurrentTime} 
        unsetIsMusicPlaying={this.props.unsetIsMusicPlaying}/>
    }
}   

const mapStateToProps = (state: RootState) => ({
    tracks: getTracks(state),
    currentTrack: getCurrentTrack(state),
    volume: getVolume(state),
    term: getFilterTerm(state)
})

const { setTrackCurrentTime, unsetIsMusicPlaying, chooseTrack } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, { setTrackCurrentTime, unsetIsMusicPlaying, requireTracks, chooseTrack }),
    withAuthRedirect
)(MainMusicPageContainer)