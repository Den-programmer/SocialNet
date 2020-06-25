import React from 'react';
import classes from './friends.module.css';
import Friend from './Friend/friend';
import defaultUser from './images/withoutAvatar/defaultUserPhoto.jpg';

const Friends = (props) => {
    let Friends = props.friends;
    let friendsArray = [];

    for (let i = 0; i < Friends.length; i++) {
        if (i <= 2) {
            friendsArray.push(Friends[i]);
        }
    }

    let friends = friendsArray.map(f => {
        return <Friend id={f.id} key={f.id} name={f.name} nickname={f.nickname} avatar={f.avatar ? f.avatar : defaultUser}/>
    });
    return (
        <div className={classes.friends}>
            <div className={classes.title}>
                <h2>Friends</h2> 
            </div>
            {friends.length !== 0 && <div className={classes.friendsList}>
                {friends}
            </div>}
        </div>
    );
}

export default Friends;