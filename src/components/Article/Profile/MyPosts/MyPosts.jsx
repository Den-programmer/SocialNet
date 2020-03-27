import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import AddPost from './AddPost/addPost';

const MyPosts = (props) => {
    let posts = props.profilePage.posts.map((post) => {
        return  <Post id={post.id} postTitle={post.postTitle} postInf={post.postInf}  likesCount={post.likesCount} />
    });

    return (
        <div className={classes.postPage}>
            <div className={classes.addPostBlock}>
                <AddPost 
                profilePage={props.profilePage}  
                dispatch={props.dispatch}/>
            </div>
            <div className={classes.posts}>
                {posts}
            </div>
        </div>
    );
}

export default MyPosts;