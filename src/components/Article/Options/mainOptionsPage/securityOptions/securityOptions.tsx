import React from 'react'
import classes from './securityOptions.module.scss'

interface ISecurityOptions {

}

const SecurityOptions:React.FC<ISecurityOptions> = (props) => {
    return (
        <div className={classes.securityOptions}>
            In developing...
        </div>
    )
}

export default SecurityOptions