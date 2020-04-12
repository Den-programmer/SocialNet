import React from 'react';
import classes from './user.module.css';

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
            <img src={props.avatar} alt="" />
            <h4>{props.nickname}</h4>
            <h6>{props.name}</h6>
            {props.followed ? <button onClick={following} >Follow</button> : <button onClick={following} >Unfollow</button>}
        </div>
    );
}

export default User;