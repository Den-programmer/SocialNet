import React from 'react';
import classes from './preloader.module.css';
import preloader from '../../../images/preloader/preloader.svg'

const Preloader:React.FC<{}> = (props) =>{
    return (
        <div className={classes.preloader}>
            <img src={ preloader } alt=""/> 
        </div>
    );
}

export default Preloader;