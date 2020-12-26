import React from 'react'
import DialogContainer from './Dialog/dialogContainer'
import DialogsContainer from './Dialogs/dialogsContainer'
import UserChatProfileContainer from './UserChatProfile/userChatProfileContainer'

interface IMessages {
    isUserProfileMenuOpen: boolean
}

const Messages: React.FC<IMessages> = ({ isUserProfileMenuOpen }) => {
    return <div style={{ width: '100%' }} className="flex-container">
        <DialogsContainer /> 
        <DialogContainer />
        {isUserProfileMenuOpen && <UserChatProfileContainer />}
    </div>
}

export default Messages