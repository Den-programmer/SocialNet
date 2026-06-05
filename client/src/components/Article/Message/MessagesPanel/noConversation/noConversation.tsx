import React from 'react'
import classes from '../../messages.module.scss'
import { Typography } from 'antd'
import {
    MessageOutlined,
} from '@ant-design/icons'

const { Text } = Typography

const NoConversation: React.FC = () => {
    return (
        <div className={classes.noSelectionState}>
            <div className={classes.noSelectionIconWrap}>
                <MessageOutlined className={classes.noSelectionIcon} />
            </div>
            <Text className={classes.noSelectionTitle}>Your Messages</Text>
            <Text className={classes.noSelectionSubtitle}>
                Select a conversation from the left to start chatting
            </Text>
        </div>
    )
}

export default NoConversation