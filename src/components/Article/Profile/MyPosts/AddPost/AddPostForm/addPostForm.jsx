import React from 'react';
import classes from './addPostForm.module.css';
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, enteredNothingError } from '../../../../../../utils/validators/validators';
import { Input } from '../../../../../common/Forms/forms';

const maxLengthPostTitle =  maxLengthCreator(20);
const maxLengthPostText = maxLengthCreator(300);

const AddPostForm = (props) => {
    return (
        <form className={classes.postForm} onSubmit={props.handleSubmit}>
            <div className={classes.postTitle}>
                <Field placeholder="Post Name" type="text" name="postName" component={Input} validate={[maxLengthPostTitle, enteredNothingError]}/>
            </div>
            <div className={classes.postInf}>
                <Field placeholder="Post Text" type="text" name="postInf" component={Input} validate={[maxLengthPostText, enteredNothingError]}/>
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