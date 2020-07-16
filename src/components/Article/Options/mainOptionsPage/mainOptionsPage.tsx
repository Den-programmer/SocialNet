import React from 'react'
import classes from './mainOptionsPage.module.css'
import AccountOptionsContainer from './accountOptions/accountOptionsContainer'

interface PropsType {}

const MainOptionsPage:React.FC<PropsType> = (props) => {
    return (
        <div className={classes.mainOptionsPage}>
            <AccountOptionsContainer />
        </div>
    )
}

export default MainOptionsPage