import React from 'react'
import classes from './conversation.module.css'
import { AccountCircle } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

interface ConversationPropType {
    id: number
    messageText: string | null
    avatar: string | null
}

const Conversation:React.FC<ConversationPropType> = React.memo(({ messageText, avatar }) => {
    return (<>
        <Avatar className={classes.avatar}>{avatar ? <img src={avatar} alt="avatar" /> : <AccountCircle />}</Avatar>
        <div className={classes.currentColumn}>
            <span className={classes.conversation}>
                <p>
                    {messageText}
                </p>
            </span>
        </div>
        </>)
})

export default Conversation