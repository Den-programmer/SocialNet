import React from 'react';
import classes from './addPostForm.module.css';
import { reduxForm, Field } from 'redux-form';

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

export default AddPostReduxForm;