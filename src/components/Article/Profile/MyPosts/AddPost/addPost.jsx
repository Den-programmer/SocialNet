import React from 'react';
import classes from './addPost.module.css';
import AddPostReduxForm from './AddPostForm/addPostForm';

const AddPost = (props) => {

    let onSubmit = (FormData) => {
        let newPostTitle = FormData.postName;
        let newPostInformat = FormData.postInf;
        props.addPost(newPostTitle, newPostInformat);
        
    }

    return (
        <div className={classes.addPost}>
            <AddPostReduxForm onSubmit={onSubmit}/>
        </div>
    );

}

export default AddPost;