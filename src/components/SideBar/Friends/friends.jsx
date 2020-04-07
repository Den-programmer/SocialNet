import React from 'react';
import classes from './friends.module.css';
import Friend from './Friend/friend';

const Friends = (props) => {

    let friends = props.Friends.friends.map((f) => {
        return <Friend id={f.id} key={f.id} nickname={f.nickname} avatar={f.avatar}/>
    });

    return (
        <div className={classes.friends}>
            <div className={classes.title}>
                <h2>Friends</h2>
            </div>
            <div className={classes.friendsList}>
                {friends}
            </div>
        </div>
    );
}

export default Friends;