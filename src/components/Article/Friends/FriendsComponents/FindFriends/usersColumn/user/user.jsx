import React from 'react';
import classes from './user.module.css';

const User = (props) => {

    // let follow = () => {
    //     if(props.followed == false) {
    //         props.follow(props.id);
    //     }
    // }
    // let unfollow = () => {
    //     if(props.followed == true) {
    //         props.unfollow(props.id);
    //     }
    // }

    let following = () => {
        if (props.followed == false) {
            props.follow(props.id, props.name, props.nickname, props.avatar);
        } else {
            props.unfollow(props.id);
        }
    }

    return (
        <div className={classes.user}>
            <img src={props.avatar} alt="" />
            <h4>{props.nickname}</h4>
            <h6>{props.name}</h6>
            {props.followed ? <button onClick={following} >Follow</button> : <button onClick={following} >Unfollow</button>}
        </div>
    );
}

export default User;