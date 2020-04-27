import React from 'react';
import classes from './profile.module.css';
import User from './User/user';
import Background from './Background/background';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return(
        <div className={classes.profile}>
            <Background />
            <User profile={props.profile}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;