import React from 'react';
import classes from './profile.module.css';
import User from './User/user';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return(
        <div className={classes.profile}>
            <User updateStatus={props.updateStatus} profile={props.profile} posts={props.posts} friends={props.friends} biography={props.profile.aboutMe}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;