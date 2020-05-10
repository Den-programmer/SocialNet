import React from 'react';
import classes from './profile.module.css';
import User from './User/user';
import Background from './Background/background';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { Redirect } from 'react-router-dom';

const Profile = (props) => {

    if (!props.isAuth) return <Redirect to='/login'/>

    return(
        <div className={classes.profile}>
            <Background />
            <User profile={props.profile} posts={props.posts} friends={props.friends} biography={props.profile.aboutMe}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;