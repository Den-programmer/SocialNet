import React from 'react';
import classes from './friend.module.css';
import defaultUserPhoto from './img/defaultUserPhoto.jpg';

const Friend = (props) => {

    let following = (e) => {

        let currentElement = e.target.parentNode;
        let id = Number(currentElement.getAttribute("id"));

        if (props.followed === false) {
            props.follow(id);
        } else {
            props.unfollow(id);
        }
    }

    return (
        <div className={classes.ObjectUser}>
            <div className={classes.user}>
                {props.avatar !== undefined ? <img src={props.avatar} alt="" /> : <img src={defaultUserPhoto} alt="" />}
                <h5>{props.nickname !== undefined ? props.nickname : props.name}</h5>
                <div className={classes.following}>
                    <button onClick={following}>Followed</button> 
                </div>
            </div>
        </div>
    );
}

export default Friend;