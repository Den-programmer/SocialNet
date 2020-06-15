import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import AddPost from './AddPost/addPost';
import defaultUser from '../images/withoutAvatar/defaultUserPhoto.jpg'

const MyPosts = React.memo(props => {
    let posts = props.posts.map(post => {
        return <Post id={post.id} key={post.id}
            postTitle={post.postTitle}
            postInf={post.postInf}
            likesCount={post.likesCount} avatar={props.profile.photos.large ? props.profile.photos.large : defaultUser} 
            deletePost={props.deletePost} editPost={props.editPost}/>
    });
    return (
        <div className={classes.postPage}>
            <div className={classes.title}>
                <h2>Add New Great Post!</h2>
            </div>
            <div className={classes.addPostBlock}>
                <AddPost addPost={props.addPost} deletePost={props.deletePost} posts={posts}/>
            </div>
            <div className={classes.posts}>
                {posts.length !== 0 ? posts : <h2 className={classes.postedNothingTitle}>You haven't posted anything yet!</h2>}
            </div>
        </div>
    );
})

export default MyPosts;