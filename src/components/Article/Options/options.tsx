import React from 'react'
import classes from './options.module.css'
import OptionsNav from './OptionsNavigation/optionsNav'
import MainOptionsPage from './mainOptionsPage/mainOptionsPage'

interface PropsType {}

const Options:React.FC<PropsType> = (props) => {
    return(
        <div className={classes.options}>
            <OptionsNav />
            <MainOptionsPage />
        </div>
    )
}

export default Options