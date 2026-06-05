import React from 'react'
import classes from '../../messages.module.scss'
import { Typography } from 'antd'

const { Text } = Typography

const NoMessages: React.FC = () => {
    return (
        <div className={classes.noMessagesState}>
            <Text className={classes.noMessagesText}>
                No messages yet. Start the conversation!
            </Text>
        </div>
    )
}

export default NoMessages