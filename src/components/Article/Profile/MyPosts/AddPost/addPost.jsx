import React from 'react';
import classes from './addPost.module.css';
import AddPostReduxForm from './AddPostForm/addPostForm';

const AddPost = ({addPost, posts, deletePost}) => {

    let onSubmit = (FormData) => {
        let {postName, postInf} = FormData;
        addPost(postName, postInf); 
    }

    return (
        <div className={classes.addPost}>
            <AddPostReduxForm onSubmit={onSubmit} deletePost={deletePost} posts={posts}/>
        </div>
    );

}

export default AddPost;