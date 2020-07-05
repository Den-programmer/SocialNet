import React from 'react';
import classes from './music.module.css';

interface MusicPropTypes {}

const Music:React.FC<MusicPropTypes> = (props) => {
    return(
        <div className={classes.music}>
            Тут должна быть музыка, я не добавил её сразу, потому что мне нужно было узнать как работают маршрутизаторы!
        </div>
    );
}

export default Music;