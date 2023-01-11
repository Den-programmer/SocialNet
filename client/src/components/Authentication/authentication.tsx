import React from 'react'
import classes from './authentication.module.css'
import LoginContainer from './Login/loginContainer'

const Authentication: React.FC<{}> = (props) => {
    return (
        <div className={classes.authentication}>
            <LoginContainer />
        </div>
    )
}

export default Authentication