import React from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core'

interface MessagesTitlePropsType {
    title: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    messagesTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconDots: {
        borderRadius: '50px',
        height: '36px',
        width: '36px',
        backgroundColor: '#EFEFEF',
        color: '#222222',
        '&:hover': {
            transition: 'all .1s linear',
            backgroundColor: '#E5E5E5'
        }
    }
}))

const MessagesTitle: React.FC<MessagesTitlePropsType> = ({ title }) => {
    const classes = useStyles()
    return (
        <div className={classes.messagesTitle}>
            <h2>{title}</h2>
            <IconButton className={classes.iconDots}>
                <MoreHorizIcon />
            </IconButton>
        </div>
    )
}

export default MessagesTitle