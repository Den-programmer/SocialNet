import React from 'react';
import classes from './addPost.module.css';
import { reduxForm, Field } from 'redux-form';

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
const AddPostForm = (props) => {
    return (
        <form className={classes.postForm} onSubmit={props.handleSubmit}>
            <div className={classes.postTitle}>
                <Field placeholder="Post Name" type="text" name="postName" component="input"/>
            </div>
            <div className={classes.postInf}>
                <Field placeholder="Post Text" type="text" name="postInf" component="input"/>
            </div>
            <div className={classes.Block_btn_addPost}>
                <button className={classes.btn_addPost}>Add Post</button>
            </div>
        </form>
    );
}
const AddPostReduxForm = reduxForm({
    form: 'addPost'
})(AddPostForm);


export default AddPost;