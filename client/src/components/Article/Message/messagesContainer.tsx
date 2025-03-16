import React from 'react'
import Messages from "./message"
import { connect } from 'react-redux'
import { withAuthRedirect } from "../../../HOC/withAuthRedirect"
import { compose } from "redux"
import { sendMessage, actions, getALLDialogs } from '../../../BLL/reducer-messages'
import { RootState } from '../../../BLL/redux'
import { getDialogsData, getMessagesTrim, getUserDialogId, getMessages } from '../../../BLL/selectors/messages-selectors'
import { message, userDialogType } from '../../../types/MessagesTypes/messagesTypes'

// import { getIsUserProfileMenuOpenStatus } from '../../../BLL/selectors/messages-selectors'

const { setUserDialogId } = actions

const mapStateToProps = (state: RootState) => ({
    // isUserProfileMenuOpen: getIsUserProfileMenuOpenStatus(state)
    dialogsData: getDialogsData(state),
    trim: getMessagesTrim(state),
    messages: getMessages(state),
    userDialogId: getUserDialogId(state)
})

// interface IMessagesContainer {
//     isUserProfileMenuOpen: boolean
// }

export interface IMessagesContainer {
    messages: Array<message>
    dialogsData: Array<userDialogType>
    sendMessage: (userId: string, message: string) => void
    userDialogId: string
    setUserDialogId: (userId: string) => void
    getALLDialogs: () => void
}

const MessagesContainer: React.FC<IMessagesContainer> = (props) => {
    return <Messages getALLDialogs={props.getALLDialogs} dialogsData={props.dialogsData} messages={props.messages} userDialogId={props.userDialogId}
    sendMessage={props.sendMessage} setUserDialogId={props.setUserDialogId}/>
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { sendMessage, setUserDialogId, getALLDialogs }),
    withAuthRedirect
)(MessagesContainer)