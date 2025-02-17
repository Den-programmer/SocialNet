import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import classes from './addPostForm.module.css';
import { AddPostFD } from '../addPost';
import noPostPhoto from '../../../../../../../images/noPhoto/nophoto.webp';

interface IAddPostForm {
    setIsAddPostWindowOpen: (status: boolean) => void;
    getPostImg: (photo: File) => void;
    postPhoto: string;
    postPhotoError: string;
    onSubmit: (data: AddPostFD) => void;
}

const AddPostForm: React.FC<IAddPostForm> = ({ setIsAddPostWindowOpen, getPostImg, postPhoto, postPhotoError, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddPostFD>();

    const closeModalWindow = () => setIsAddPostWindowOpen(false);

    const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            getPostImg(file);
        }
    };

    return (
        <form className={classes.postForm} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className={classes.btn_closeTheWindow}>
                <p onClick={closeModalWindow}>&times;</p>
            </div>
            <div className={classes.modalTitle}>
                <h4>Adding a new post!</h4>
            </div>
            <div className={classes.photo}>
                <img loading="lazy" src={postPhoto ? postPhoto : noPostPhoto} alt="" />
            </div>
            <div className={classes.btn_selectPhoto}>
                <label htmlFor="fileInputAddPostPhoto">Select photo</label>
                <input onChange={onInputFileChange} type="file" accept="/image*" id="fileInputAddPostPhoto" />
            </div>
            {postPhotoError && <div className={classes.error}>
                <span>{postPhotoError}</span>
            </div>}
            <div className={classes.postTitle}>
                <input
                    placeholder="Enter post name"
                    type="text"
                    {...register('postName', { required: 'Post name is required', maxLength: 20 })}
                />
                {errors.postName && <span className={classes.messageError}>{errors.postName.message}</span>}
            </div>
            <div className={classes.postInf}>
                <textarea
                    placeholder="Enter post description"
                    {...register('postInf', { required: 'Post text is required', maxLength: 300 })}
                />
                {errors.postInf && <span className={classes.messageError}>{errors.postInf.message}</span>}
            </div>
            <div className={classes.dFlex}>
                <div className={classes.Block_btn_addPost}>
                    <button className={classes.btn_addPost}>Add Post</button>
                </div>
            </div>
        </form>
    );
};

export default AddPostForm