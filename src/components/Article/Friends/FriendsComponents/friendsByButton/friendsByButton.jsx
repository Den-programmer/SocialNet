import React from 'react';
import classes from './friendsByButton.module.css';
import Friend from './Friend/friend';

const FriendsByButton = (props) => {
    let friends = props.friends.map((f) => {
        return <Friend id={f.id} nickname={f.nickname} name={f.name} avatar={f.avatar}/>;
    });

    return (
        <div className={classes.friends}>
            {friends}
        </div>
    );
}

export default FriendsByButton;