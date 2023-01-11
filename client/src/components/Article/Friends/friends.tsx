import React from 'react'
import FriendsNavContainer from './FriendsNav/friendsNavContainer'
import FriendsComponents from './FriendsComponents/friendsComponents'

interface IFriends {}

const Friends:React.FC<IFriends> = (props) => {
    return (
        <div>
            <FriendsNavContainer />
            <FriendsComponents />
        </div>
    )
}

export default Friends