import React from 'react';
import classes from './friendsComponents.module.css';
import FriendsByButtonContainer from './friendsByButton/friendsByButtonContainer';
import FindFriends from './FindFriends/findFriends';

const FriendsComponents = (props) => {
    return (
        <div className={classes.friendsComponents}>
            <FriendsByButtonContainer />
            <FindFriends />
        </div>
    );
}

export default FriendsComponents;