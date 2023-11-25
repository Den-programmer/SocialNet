import React, { ChangeEvent } from 'react'
import classes from './addPostForm.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, enteredNothingError } from '../../../../../../../utils/validators/validators'
import { Input, createField, Textarea } from '../../../../../../common/Forms/forms'
import { AddPostFD } from '../addPost'
import noPostPhoto from '../../../../../../../images/noPhoto/nophoto.png'

interface IAddPostForm {
    setIsAddPostWindowOpen: (status: boolean) => void
    getPostImg: (photo: File) => void
    postPhoto: string
    postPhotoError: string
}

const maxLengthPostTitle = maxLengthCreator(20)
const maxLengthPostText = maxLengthCreator(300)

const AddPostForm: React.FC<InjectedFormProps<AddPostFD, IAddPostForm> & IAddPostForm> = (props) => {
    const closeModalWindow = () => props.setIsAddPostWindowOpen(false)
    const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0]
            props.getPostImg(file)
        }
    }
    return (
        <form className={classes.postForm} onSubmit={props.handleSubmit} encType='multipart/form-data'>
            <div className={classes.btn_closeTheWindow}>
                <p onClick={closeModalWindow}>&times;</p>
            </div>
            <div className={classes.modalTitle}>
                <h4>Adding a new post!</h4>
            </div>
            <div className={classes.photo}>
                <img src={props.postPhoto ? props.postPhoto : noPostPhoto} alt="" />
            </div>
            <div className={classes.btn_selectPhoto}>
                <label htmlFor="fileInputAddPostPhoto">Select photo</label>
                <input onChange={onInputFileChange} type="file" accept="/image*" id="fileInputAddPostPhoto" name="postPhoto" />
            </div>
            {props.postPhotoError && <div className={classes.error}>
                <span>{props.postPhotoError}</span>
            </div>}
            <div className={classes.postTitle}>
                {createField("text", "Post Name", "postName", Input, [maxLengthPostTitle, enteredNothingError])}
            </div>
            <div className={classes.postInf}>
                {createField("text", "Post Text", "postInf", Textarea, [maxLengthPostText, enteredNothingError])}
            </div>
            <div className={classes.dFlex}>
                <div className={classes.Block_btn_addPost}>
                    <button className={classes.btn_addPost}>Add Post</button>
                </div>
            </div>
        </form>
    )
}
const AddPostReduxForm = reduxForm<AddPostFD, IAddPostForm>({
    form: 'addPost'
})(AddPostForm)

export default AddPostReduxForm