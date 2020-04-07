import React from 'react';
import classes from './friends.module.css';
import FriendsNav from './FriendsNav/friendsNav';
import FriendsComponents from './FriendsComponents/friendsComponents';

const Friends = (props) => {
    return (
        <div className={classes.Friends}>
            <FriendsNav />
            <FriendsComponents />
        </div>
    );
}

export default Friends;