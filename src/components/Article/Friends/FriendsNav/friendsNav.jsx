import React from 'react';
import classes from './friendsNav.module.css';
import { NavLink } from 'react-router-dom';

const FriendsNav = (props) => {
    return (
        <div className={classes.friendsButtons}>
            <div className={classes.btn_friends}>
                <button title="Here's your friends!">
                    <NavLink to="/Friends/DataFriends">
                        Friends
                    </NavLink>
                </button>
            </div>
            <div className={classes.btn_findFriends}>
                <button title="You can find new friend here!">
                    <NavLink to="/Friends/FindUsers">
                        Find Friends
                    </NavLink>
                </button>
            </div>
        </div>
    );
}

export default FriendsNav;