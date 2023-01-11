import React from 'react'
import classes from './music.module.css'
import MainMusicPageContainer from './MainMusicPage/mainMusicPageContainer'

interface MusicPropTypes {}

const Music:React.FC<MusicPropTypes> = (props) => {
    return(
        <div className={classes.music}>
            <MainMusicPageContainer />
        </div>
    )
}

export default Music