import React from 'react'
import classes from './addPostForm.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, enteredNothingError } from '../../../../../../utils/validators/validators'
import { Input, createField } from '../../../../../common/Forms/forms'
import { AddPostFD } from '../addPost'
import { postType } from '../../../../../../BLL/reducer-profile'

interface IAddPostForm {
    posts: Array<postType>
    deletePost: (postId: number) => void
}

const maxLengthPostTitle = maxLengthCreator(20)
const maxLengthPostText = maxLengthCreator(300)

const AddPostForm: React.FC<InjectedFormProps<AddPostFD, IAddPostForm> & IAddPostForm> = (props) => {

    let deleteLastPost = () => {
        let lastPostId = props.posts.length
        props.deletePost(lastPostId)
    }

    return (
        <form className={classes.postForm} onSubmit={props.handleSubmit}>
            <div className={classes.postTitle}>
                {createField("text", "Post Name", "postName", Input, [maxLengthPostTitle, enteredNothingError])}
            </div>
            <div className={classes.postInf}>
                {createField("text", "Post Text", "postInf", Input, [maxLengthPostText, enteredNothingError])}
            </div>
            <div className={classes.dFlex}>
                <div className={classes.Block_btn_addPost}>
                    <button className={classes.btn_addPost}>Add Post</button>
                </div>
                {props.posts.length !== 0 && 
                <div onClick={deleteLastPost} title="Delete last post!" className={classes.deleteLastPostBtn}>
                    Delete Last Post!
                </div>}
            </div>
        </form>
    )
}
const AddPostReduxForm = reduxForm<AddPostFD, IAddPostForm>({
    form: 'addPost'
})(AddPostForm)

export default AddPostReduxForm