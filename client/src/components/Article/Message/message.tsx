import React from 'react'
// import DialogContainer from './Dialog/dialogContainer'
// import DialogsContainer from './Dialogs/dialogsContainer'
// import UserChatProfileContainer from './UserChatProfile/userChatProfileContainer'
import MessagesPage from './newMessagesC'
import { IMessagesContainer } from './messagesContainer'

// interface IMessages {
//     isUserProfileMenuOpen: boolean
// }

const Messages: React.FC<IMessagesContainer> = (props) => {
    // return <div style={{ width: '100%' }} className="flex-container">
    //     <DialogsContainer /> 
    //     <DialogContainer />
    //     {isUserProfileMenuOpen && <UserChatProfileContainer />}
    // </div>
    return <MessagesPage getALLDialogs={props.getALLDialogs} dialogsData={props.dialogsData} messages={props.messages} userDialogId={props.userDialogId}
        sendMessage={props.sendMessage} setUserDialogId={props.setUserDialogId}/>
}

export default Messages