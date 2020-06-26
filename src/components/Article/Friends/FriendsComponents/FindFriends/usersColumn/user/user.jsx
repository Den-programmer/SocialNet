import React from 'react';
import classes from './user.module.css';
import defaultUserPhoto from './img/defaultUserPhoto.jpg';
import { NavLink } from 'react-router-dom';

const User = (props) => {

    let following = () => {
        if (props.followed === false) {
            props.followThunk(props.id);
        } else {
            props.unfollowThunk(props.id);
        }    
    }

    return (
        <div id={props.id} className={classes.user}>
            <NavLink to={"/Profile/" + props.id}>
                {props.photo !== null ? <img src={props.photo} alt="" /> : <img src={defaultUserPhoto} alt="" />}
                <h4>{props.nickname}</h4>
                <h6>{props.name}</h6>
            </NavLink>
            {props.followed ? <button disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Add this user to list of friends!">Follow</button> 
            : 
            <button disabled={props.followingInProcess.some(id => id === props.id)} onClick={following} title="Delete this user from your list of friends!">Unfollow</button>}
        </div>
    );
}

export default User;