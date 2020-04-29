import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import AddPost from './AddPost/addPost';
import defaultUser from '../images/withoutAvatar/defaultUserPhoto.jpg'

const MyPosts = (props) => {
    let posts = props.posts.map(post => {
        return  <Post id={post.id} key={post.id} 
                postTitle={post.postTitle} 
                postInf={post.postInf}  
                likesCount={post.likesCount} avatar={props.profile.photos.large ? props.profile.photos.large : defaultUser}/>
    });

    return (
        <div className={classes.postPage}>
            <div className={classes.addPostBlock}>
                <AddPost profilePage={props.profilePage} onPostTitleChange={props.onPostTitleChange} 
                onPostInfChange={props.onPostInfChange} 
                ValueOfPostInf={props.ValueOfPostInf}
                ValueOfPostTitle={props.ValueOfPostTitle}
                addPost={props.addPost} />
            </div>
            <div className={classes.posts}>
                {posts}
            </div>
        </div>
    );
}

export default MyPosts;