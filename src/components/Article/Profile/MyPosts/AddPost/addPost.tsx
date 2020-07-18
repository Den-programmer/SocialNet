import React from 'react'
import classes from './addPost.module.css'
import AddPostReduxForm from './AddPostForm/addPostForm'
import { postType } from '../../../../../BLL/reducer-profile'

interface IAddPost {
    addPost: (postName: string, postInf: string) => void
    posts: Array<postType>
    deletePost: (postId: number) => void
}

export interface AddPostFD {
    postName: string
    postInf: string
}

const AddPost: React.FC<IAddPost> = ({addPost, posts, deletePost}) => {

    let onSubmit = (FormData: AddPostFD) => {
        let {postName, postInf} = FormData
        addPost(postName, postInf);
    }

    return (
        <div className={classes.addPost}>
            <AddPostReduxForm onSubmit={onSubmit} deletePost={deletePost} posts={posts}/>
        </div>
    )

}

export default AddPost