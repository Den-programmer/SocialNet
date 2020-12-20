import React from 'react'
import Search from './Search/search'
import MessagesTitle from './MessagesTitle/messagesTitle'
import Users from './Users/users'
import { userDialogType } from '../../../../types/MessagesTypes/messagesTypes'
import { Container, makeStyles, createStyles, Theme } from '@material-ui/core'

interface DialogsPropsType {
    dialogsData: Array<userDialogType>
    userDialogId: number | null
    setUserDialogId: (userId: number) => void
    getDialogMessages: (userId: number) => void
    setUserActiveStatus: (userId: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    dialogs: {
        margin: '0',
        borderRight: '1px solid #E5E5E5'
    }
}))

const Dialogs: React.FC<DialogsPropsType> = ({ dialogsData, setUserDialogId, getDialogMessages, userDialogId, setUserActiveStatus }) => {
    const classes = useStyles()
    return (
        <Container className={classes.dialogs} maxWidth="xs">
            <MessagesTitle title="Dialogs" />
            <Search />
            <Users dialogsData={dialogsData} 
            userDialogId={userDialogId} 
            setUserDialogId={setUserDialogId}
            getDialogMessages={getDialogMessages}
            setUserActiveStatus={setUserActiveStatus} />
        </Container>
    )
}

export default Dialogs