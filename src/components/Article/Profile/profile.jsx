import React from 'react';
import classes from './profile.module.css';
import User from './User/user';
import Background from './Background/background';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../../common/preloader/preloader';

const Profile = (props) => {
    // if(!props.profile) {
    //     return <Preloader />
    // }
    return(
        <div className={classes.profile}>
            <Background />
            <User profile={props.profile} posts={props.posts} friends={props.friends}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;