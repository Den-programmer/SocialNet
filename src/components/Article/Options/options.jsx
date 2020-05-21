import React from 'react';
import classes from './options.module.css';
import OptionsNav from './OptionsNavigation/optionsNav';
import MainOptionsPage from './mainOptionsPage/mainOptionsPage';

const Options = (props) => {
    return(
        <div className={classes.options}>
            <OptionsNav />
            <MainOptionsPage />
        </div>
    );
}

export default Options;