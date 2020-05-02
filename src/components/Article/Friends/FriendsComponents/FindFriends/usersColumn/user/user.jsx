import React from 'react';
import classes from './user.module.css';
import defaultUserPhoto from './img/defaultUserPhoto.jpg';
import * as axios from 'axios';
import { NavLink } from 'react-router-dom';

const User = (props) => {


    let following = (e) => {

        let currentElement = e.target.parentNode;
        let id = Number(currentElement.getAttribute("id"));

        if (props.followed == false) {
            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {
                withCredentials: true,
                headers: {
                    "API-KEY": "84df6f8d-3114-43eb-bbd6-9f107dc49f3e"
                }
            }).then(response => {
                if (response.data.resultCode == 0) {
                    props.follow(id);
                }
            });
        } else {
            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {
                withCredentials: true,
                headers: {
                    "API-KEY": "84df6f8d-3114-43eb-bbd6-9f107dc49f3e"
                }
            }).then(response => {
                if (response.data.resultCode == 0) {
                    props.unfollow(id);
                }
            });
        }
    }

    return (
        <div id={props.id} className={classes.user}>
            <NavLink to={"/Profile/" + props.id}>
                {props.photo !== null ? <img src={props.photo} alt="" /> : <img src={defaultUserPhoto} alt="" />}
                <h4>{props.nickname}</h4>
                <h6>{props.name}</h6>
            </NavLink>
            {props.followed ? <button onClick={following} title="Add this user to list of friends!">Follow</button> : <button onClick={following} title="Delete this user from your list of friends!">Unfollow</button>}
        </div>
    );
}

export default User;