import React from 'react';
import classes from './friend.module.css';

const Friend = (props) => {
    return (
        <div className={classes.ObjectUser}>
            <div className={classes.user}>
                <div className={classes.avatar}>
                    <img src={props.avatar} alt="" />
                    <div className={classes.following}>
                        <button>
                            Follow
                        </button>
                    </div>
                </div>
                <div className={classes.usersInf}>
                    <h5>{props.nickname}</h5>
                    <h6>{props.name}</h6>
                </div>
            </div>
        </div>
    );
}

export default Friend;