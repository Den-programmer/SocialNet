import React, { useState, useEffect } from 'react';
import classes from './addPost.module.css';
import AddPostForm from './AddPostForm/addPostForm';
import { Portal } from '../../../../../common/Portal/portal';

interface IAddPost {
    userId: any;
    addPost: (userId: string, newPostTitle: string, newPostInformat: string, postPhoto: File) => void;
    setIsAddPostWindowOpen: (status: boolean) => void;
    messageError: string;
    setTextError: (text: string) => void;
}

export interface AddPostFD {
    postName: string;
    postInf: string;
}

const AddPost: React.FC<IAddPost> = ({ userId, addPost, setIsAddPostWindowOpen, messageError, setTextError }) => {
    const [postPhoto, setPostPhoto] = useState<File | null>(null);

    useEffect(() => {
        return () => {
            if (postPhoto) {
                URL.revokeObjectURL(URL.createObjectURL(postPhoto));
            }
        };
    }, [postPhoto]);

    const getPostImg = (photo: File) => setPostPhoto(photo);

    const onSubmit = (formData: AddPostFD) => {
        const { postName, postInf } = formData;
        if (postPhoto) {
            addPost(userId, postName, postInf, postPhoto);
            setIsAddPostWindowOpen(false);
        } else {
            setTextError('You must choose the post image!');
        }
    };

    const postPhotoURL = postPhoto ? URL.createObjectURL(postPhoto) : '';

    return (
        <Portal>
            <div className={classes.addPostContainer}>
                <div className={classes.addPost}>
                    <AddPostForm
                        onSubmit={onSubmit}
                        setIsAddPostWindowOpen={setIsAddPostWindowOpen}
                        postPhoto={postPhotoURL}
                        getPostImg={getPostImg}
                        postPhotoError={messageError}
                    />
                </div>
            </div>
        </Portal>
    );
};

export default AddPost
