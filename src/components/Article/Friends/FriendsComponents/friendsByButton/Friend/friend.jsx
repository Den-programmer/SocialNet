import React from 'react';
import classes from './friend.module.css';

const Friend = (props) => {

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
        <div className={classes.ObjectUser}>
            <div className={classes.user}>
                <img src={props.avatar} alt="" />
                <h5>{props.nickname}</h5>
                <div className={classes.following}>
                    <button onClick={following}>Followed</button> 
                </div>
            </div>
        </div>
    );
}

export default Friend;