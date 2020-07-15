import React from 'react'
import classes from './messagesTitle.module.css'

interface MessagesTitlePropsType {
    title: string
}

const MessagesTitle:React.FC<MessagesTitlePropsType> = ({title}) => {
    return (
        <div className={classes.title}>
            <h2>{title}</h2>
        </div>
    )
} 

export default MessagesTitle