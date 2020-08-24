import React, { useState } from 'react'
import classes from './addPost.module.css'
import AddPostReduxForm from './AddPostForm/addPostForm'
import { Portal } from '../../../../common/Portal/portal'

interface IAddPost {
    addPost: (postName: string, postInf: string, postPhoto: string | File) => void
    setIsAddPostWindowOpen: (status: boolean) => void
}

export interface AddPostFD {
    postName: string
    postInf: string
}

const AddPost: React.FC<IAddPost> = ({ addPost, setIsAddPostWindowOpen }) => {
    const [postPhoto, setPostPhoto] = useState<string>('')
    const getPostImg = (photo: string) => setPostPhoto(photo)
    const onSubmit = (FormData: AddPostFD) => {
        const { postName, postInf } = FormData
        addPost(postName, postInf, postPhoto)
        setIsAddPostWindowOpen(false)
    }
    return (
        <Portal>
            <div className={classes.addPostContainer}>
                <div className={classes.addPost}>
                    <AddPostReduxForm onSubmit={onSubmit} setIsAddPostWindowOpen={setIsAddPostWindowOpen} postPhoto={postPhoto} getPostImg={getPostImg}/>
                </div>
            </div>
        </Portal>
    )

}

export default AddPost