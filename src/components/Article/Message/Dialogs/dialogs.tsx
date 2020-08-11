import React from 'react'
import classes from './dialogs.module.css'
import Search from './Search/search'
import MessagesTitle from './MessagesTitle/messagesTitle'
import Users from './Users/users'
import { userDialogType } from '../../../../types/MessagesTypes/messagesTypes'

interface DialogsPropsType {
    dialogsData: Array<userDialogType>
    userDialogId: number | null
    setUserDialogId: (userId: number) => void
    getDialogMessages: (userId: number) => void
}

const Dialogs: React.FC<DialogsPropsType> = ({ dialogsData, setUserDialogId, getDialogMessages, userDialogId }) => {
    return (
        <div className={classes.dialogs}>
            <Search />
            <MessagesTitle title="Dialogs" />
            <Users dialogsData={dialogsData} userDialogId={userDialogId} setUserDialogId={setUserDialogId} getDialogMessages={getDialogMessages} />
        </div>
    )
}

export default Dialogs