import React from 'react';
import classes from './profile.module.css';
import User from './User/user';
import Background from './Background/background';
import MyPosts from './MyPosts/MyPosts';

const Profile = (props) => {
    return(
        <div className={classes.profile}>
            <Background />
            <User />
            <MyPosts profilePage={props.profilePage}
            render={props.render}
            dispatch={props.dispatch}
            state={props.state} 
            posts={props.posts}/>
        </div>
    );
}

export default Profile;