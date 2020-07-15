import React from 'react'
import classes from './dialogs.module.css'
import Search from './Search/search'
import MessagesTitle from './MessagesTitle/messagesTitle'
import Users from './Users/users'
import { userDialogType } from '../../../../types/MessagesTypes/messagesTypes'

interface DialogsPropsType {
    dialogsData: Array<userDialogType>
}

const Dialogs:React.FC<DialogsPropsType> = ({dialogsData}) => {
    return (
        <div className={classes.dialogs}>
            <Search />
            <MessagesTitle title="Dialogs"/>
            <Users dialogsData={dialogsData}/>
        </div>
    )
}

export default Dialogs