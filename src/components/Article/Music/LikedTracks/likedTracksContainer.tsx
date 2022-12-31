import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../BLL/redux'
import { getLikedTracks, getCurrentTrack, getVolume, getFilterTerm } from '../../../../BLL/selectors/music-selectors'
import MainMusicPage from '../MainMusicPage/mainMusicPage'
import { actions } from '../../../../BLL/reducer-music'
import { IMainMusicPageProps } from '../MainMusicPage/mainMusicPage'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { compose } from 'redux'

interface IProps extends IMainMusicPageProps {
    setLikedTracks: () => void
}

class LikedTracksClass extends React.Component<IProps> {
    componentDidMount() {
        this.props.setLikedTracks()
    }
    render() {
        return <MainMusicPage term={this.props.term} chooseTrack={this.props.chooseTrack} volume={this.props.volume} currentTrack={this.props.currentTrack} unsetIsMusicPlaying={this.props.unsetIsMusicPlaying} 
        tracks={this.props.tracks} setTrackCurrentTime={this.props.setTrackCurrentTime}/>
    }
}

const mapStateToProps = (state:RootState) => ({
    tracks: getLikedTracks(state),
    currentTrack: getCurrentTrack(state),
    volume: getVolume(state),
    term: getFilterTerm(state)
})

const { setTrackCurrentTime, setLikedTracks, unsetIsMusicPlaying, chooseTrack } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setTrackCurrentTime, 
        setLikedTracks, 
        unsetIsMusicPlaying, 
        chooseTrack}),
    withAuthRedirect
)(LikedTracksClass)