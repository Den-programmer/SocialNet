import React from 'react';
import classes from './friend.module.css';

const Friend = (props) => {
    return (
        <div className={classes.ObjectUser}>
            <div className={classes.user}>
                <img src={props.avatar} alt="" />
                <h5>{props.nickname}</h5>
                <div className={classes.following}>
                    <button>
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Friend;