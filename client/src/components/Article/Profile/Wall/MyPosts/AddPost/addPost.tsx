import React, { useState } from 'react'
import classes from './addPost.module.css'
import AddPostReduxForm from './AddPostForm/addPostForm'
import { Portal } from '../../../../../common/Portal/portal'

interface IAddPost {
    userId: any
    addPost: (userId: string, newPostTitle: string, newPostInformat: string, postPhoto: string) => void
    setIsAddPostWindowOpen: (status: boolean) => void
    messageError: string
    setTextError: (text: string) => void
}

export interface AddPostFD {
    postName: string
    postInf: string
}

const AddPost: React.FC<IAddPost> = ({ userId, addPost, setIsAddPostWindowOpen, messageError, setTextError }) => {
    const [postPhoto, setPostPhoto] = useState<string>('')
    const getPostImg = (photo: string) => setPostPhoto(photo)
    const onSubmit = (FormData: AddPostFD) => {
        const { postName, postInf } = FormData
        if(postPhoto !== '') {
            addPost(userId, postName, postInf, postPhoto)
            setIsAddPostWindowOpen(false)
        } else {
            setTextError('You must choose the post image!')
        }
    }
    return (
        <Portal>
            <div className={classes.addPostContainer}>
                <div className={classes.addPost}>
                    <AddPostReduxForm onSubmit={onSubmit} 
                    setIsAddPostWindowOpen={setIsAddPostWindowOpen} 
                    postPhoto={postPhoto} 
                    getPostImg={getPostImg}
                    postPhotoError={messageError}/>
                </div>
            </div>
        </Portal>
    )

}

export default AddPost