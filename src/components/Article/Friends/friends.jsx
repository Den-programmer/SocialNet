import React from 'react';
import classes from './friends.module.css';
import FriendsNavContainer from './FriendsNav/friendsNavContainer';
import FriendsComponents from './FriendsComponents/friendsComponents';

const Friends = (props) => {
    return (
        <div className={classes.Friends}>
            <FriendsNavContainer />
            <FriendsComponents />
        </div>
    );
}

export default Friends;