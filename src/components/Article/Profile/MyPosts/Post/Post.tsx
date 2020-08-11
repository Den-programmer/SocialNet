import React, { useState } from 'react'
import classes from './Post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Notifications from './notifications/notifications'
import Btn_Confirm from '../../../../common/Btns/Btn_confirm/btn_confirm'

interface IPost {
    postTitle: string
    postInf: string
    id: number
    likesCount: number
    avatar: string
    editPost: (postId: number, newPostTitle: string, newPostInf: string) => void
    deletePost: (postId: number) => void
}

const Post: React.FC<IPost> = (props) => {
    const [isEdit, setIsEditStatus] = useState<boolean>(false)
    const [postTitle, setPostTitle] = useState<string>(props.postTitle)
    const [postInf, setPostInf] = useState<string>(props.postInf) 

    const onPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newPostTitle = e.currentTarget.value
        if(newPostTitle === '') newPostTitle = 'Untitled'
        setPostTitle(newPostTitle)
        props.editPost(props.id, postTitle, postInf)
    }
    const onPostInfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newPostInf = e.currentTarget.value
        if(newPostInf === '') newPostInf = 'This is some text that has no meaning!'
        setPostInf(newPostInf)
        props.editPost(props.id, postTitle, postInf)
    }

    const activateEditMode = () => setIsEditStatus(true)
    const deactivateEditMode = () => setIsEditStatus(false)

    return (
        <div className={classes.post}>
            <div className={classes.wrapper}>
                <img className={classes.post__author} src={props.avatar} alt="author" />
                <Notifications isEdit={isEdit} activateEditMode={activateEditMode} id={props.id} deletePost={props.deletePost} />
            </div>
            {isEdit ? <div className={classes.editPostTitle}>
                <input className={classes.editInputs} onChange={onPostTitleChange} value={postTitle} />
            </div> : <h3 onClick={activateEditMode} className={classes.post__title}>
                    {postTitle}
                </h3>}
            {isEdit ? <div className={classes.editPostInf}>
                <input className={classes.editInputs} onChange={onPostInfChange} value={postInf} />
            </div> : <p onClick={activateEditMode} className={classes.post__text}>
                    {postInf}
                </p>}
            {isEdit ? <div className={classes.confirm_btn}><Btn_Confirm clickFunction={deactivateEditMode} /></div> : <div className={classes.dFlex}>
                <FontAwesomeIcon icon={faHeart} /><p className={classes.m}>{props.likesCount}</p>
            </div>}
        </div>
    )
}

export default Post