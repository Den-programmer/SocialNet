import React from 'react';
import classes from './friendsNav.module.css';
import { NavLink } from 'react-router-dom';

const FriendsNav = (props) => {
    return (
        <div className={classes.friendsButtons}>
            <div className={classes.btn_friends}>
                <button>
                    <NavLink to="/Friends/DataFriends">
                        Friends
                    </NavLink>
                </button>
            </div>
            <div className={classes.btn_findFriends}>
                <button>
                    <NavLink to="/Friends/FindUsers">
                        Find Friends
                    </NavLink>
                </button>
            </div>
        </div>
    );
}

export default FriendsNav;