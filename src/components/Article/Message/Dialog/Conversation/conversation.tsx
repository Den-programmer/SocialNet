import React from 'react'
import classes from './conversation.module.css'

interface ConversationPropType {
    id: number
    messageText: string | null
}

const Conversation:React.FC<ConversationPropType> = React.memo(({ messageText }) => {
    return (
        <div className={classes.currentColumn}>
            <span className={classes.conversation}>
                <p>
                    {messageText}
                </p>
            </span>
        </div>
    )
})

export default Conversation