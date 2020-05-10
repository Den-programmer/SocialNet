import React from 'react';
import classes from './friendsByButton.module.css';
import Friend from './Friend/friend';
import { Redirect } from 'react-router-dom';

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
    if(!props.isAuth) return <Redirect to='/login'/>
// Сделай функцию в reducer'e, которая будет подписывать и отписывать пользователей при нажатии на кнопку!
    return (
        <div className={classes.friends}>
            {friends}
        </div>
    );
}

export default FriendsByButton;