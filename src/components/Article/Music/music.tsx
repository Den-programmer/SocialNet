import React from 'react'
import classes from './music.module.css'
import MusicPageNavContainer from './MusicPageNavigation/musicPageNavContainer'
import MainMusicPageContainer from './MainMusicPage/mainMusicPageContainer'

interface MusicPropTypes {}

const Music:React.FC<MusicPropTypes> = (props) => {
    return(
        <div className={classes.music}>
            <MusicPageNavContainer />
            <MainMusicPageContainer />
        </div>
    );
}

export default Music;