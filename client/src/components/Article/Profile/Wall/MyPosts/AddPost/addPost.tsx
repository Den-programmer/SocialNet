import React, { useState, useEffect } from 'react'
import classes from './addPost.module.css'
import AddPostForm from './AddPostForm/addPostForm'
import { Portal } from '../../../../../common/Portal/portal'
import { profileActions } from '../../../../../../BLL/reducer-profile'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { selectMessageError } from '../../../../../../BLL/selectors/selectors'
import { appActions } from '../../../../../../BLL/reducer-app'
import { postPayload } from '../../../../../../DAL/profileApi'

interface IAddPost {
    userId: string | undefined
    addPost: (data: postPayload) => void
}

export interface AddPostFD {
    postName: string;
    postInf: string;
}

const AddPost: React.FC<IAddPost> = ({ userId, addPost }) => {
    const messageError = useAppSelector(selectMessageError)

    const [postPhoto, setPostPhoto] = useState<File | null>(null)

    const postPhotoURL = postPhoto ? URL.createObjectURL(postPhoto) : '';

    const { setIsAddPostModalOpen } = profileActions
    const { setTextError } = appActions

    const dispatch = useAppDispatch()

    const handleTextError = (error: string) => dispatch(setTextError(error))
    const handleAddPostModalWindowStatus = (status: boolean) => dispatch(setIsAddPostModalOpen(status))

    useEffect(() => {
        return () => {
            if (postPhoto) {
                URL.revokeObjectURL(postPhotoURL)
            }
        }
    }, [postPhoto])

    const getPostImg = (photo: File) => setPostPhoto(photo)

    const onSubmit = (formData: AddPostFD) => {
        const { postName, postInf } = formData
        if (postPhoto) {
            addPost({userId, newPostTitle: postName, newPostInformat: postInf, postPhoto})
            handleAddPostModalWindowStatus(false)
        } else {
            handleTextError('You must choose the post image!')
        }
    }

    return (
        <Portal>
            <div className={classes.addPostContainer}>
                <div className={classes.addPost}>
                    <AddPostForm
                        onSubmit={onSubmit}
                        setIsAddPostWindowOpen={handleAddPostModalWindowStatus}
                        postPhoto={postPhotoURL}
                        getPostImg={getPostImg}
                        postPhotoError={messageError}
                    />
                </div>
            </div>
        </Portal>
    )
}

export default AddPost