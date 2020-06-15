import React from 'react';
import classes from './friend.module.css';
import defaultUserPhoto from './img/defaultUserPhoto.jpg';

const Friend = (props) => {
    
    let following = () => {
        if (props.followed === false) props.follow(props.id);
        props.unfollow(props.id);
    }

    return (
        <div className={classes.ObjectUser}>
            <div className={classes.user}>
                {props.avatar ? <img src={props.avatar} alt="" /> : <img src={defaultUserPhoto} alt="" />}
                <h5>{props.nickname ? props.nickname : props.name}</h5>
                <div className={classes.following}>
                    <button onClick={following}>Followed</button> 
                </div>
            </div>
        </div>
    );
}

export default Friend;