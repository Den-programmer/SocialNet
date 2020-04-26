import React from 'react';
import classes from './friendsComponents.module.css';
import FriendsByButtonContainer from './friendsByButton/friendsByButtonContainer';
import FindFriendsContainer from './FindFriends/findFriendsContainer';

const FriendsComponents = (props) => {
    return (
        <div className={classes.friendsComponents}>
            <FriendsByButtonContainer />
            <FindFriendsContainer />
        </div>
    );
}

export default FriendsComponents;