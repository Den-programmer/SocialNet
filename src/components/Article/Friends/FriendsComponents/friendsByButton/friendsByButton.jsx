import React from 'react';
import classes from './friendsByButton.module.css';
import Friend from './Friend/friend';
import NoFriendsComponent from './NOfriendsComponent/NOfriendsComponent';

const FriendsByButton = (props) => {
    let friends = props.friends.map((f) => {
        return <Friend id={f.id} 
                       key={f.id} 
                       nickname={f.nickname} 
                       name={f.name} 
                       avatar={f.avatar} 
                       followed={f.followed} 
                       follow={props.follow} 
                       unfollow={props.unfollow}/>;
    });
    return (
        <div className={classes.friends}>
            {friends.length !== 0 ? friends : <NoFriendsComponent />}
        </div>
    );
}

export default FriendsByButton;