import React from 'react';
import MyPosts from './MyPosts';
import {addPostActionCreator} from '../../../../BLL/reducer-profile';
import {onPostTitleChangeActionCreator} from '../../../../BLL/reducer-profile';
import {onPostInfChangeActionCreator} from '../../../../BLL/reducer-profile';

const MyPostsContainer = (props) => {

    let addPost = (newPostTitle, newPostInformat) => {
        props.dispatch(addPostActionCreator(newPostTitle, newPostInformat));
    }

    let onPostTitleChange = (newPostTitleVal) => {
        props.dispatch(onPostTitleChangeActionCreator(newPostTitleVal));
    }

    let onPostInfChange = (newPostInformatVal) => {
        props.dispatch(onPostInfChangeActionCreator(newPostInformatVal));
    }

    return (
        <MyPosts profilePage={props.profilePage} onPostInfChange={onPostInfChange} 
        onPostTitleChange={onPostTitleChange}
        addPost={addPost} 
        posts={props.profilePage.posts} />
    );
}

export default MyPostsContainer;