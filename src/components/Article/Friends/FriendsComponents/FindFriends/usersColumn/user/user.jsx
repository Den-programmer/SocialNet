import React from 'react';
import classes from './user.module.css';
import defaultUserPhoto from './img/defaultUserPhoto.jpg';

const User = (props) => {

    
    let following = (e) => {

        let currentElement = e.target.parentNode;
        let id = Number(currentElement.getAttribute("id"));

        if (props.followed == false) {
            props.follow(id);
        } else {
            props.unfollow(id);
        }
    }

    return (
        <div id={props.id} className={classes.user}>
            {props.photo !== null ? <img src={props.photo} alt=""/> : <img src={defaultUserPhoto} alt=""/>}
            <h4>{props.nickname}</h4>
            <h6>{props.name}</h6>
            {props.followed ? <button onClick={following} title="Add this user to list of friends!">Follow</button> : <button onClick={following} title="Delete this user from your list of friends!">Unfollow</button>}
        </div>
    );
}

export default User;