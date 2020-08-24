import React, { useState } from 'react'
import classes from './postModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Notifications from './notifications/notifications'
import Btn_Confirm from '../../../../../common/Btns/Btn_confirm/btn_confirm'
import { Portal } from '../../../../../common/Portal/portal'
import noPostImg from '../../../../../../images/noPhoto/nophoto.png'

interface IPost {
    currentDate: string
    userName: string
    postTitle: string
    postInf: string
    postImg: any
    id: number
    likesCount: number
    avatar: string
    editPost: (postId: number, newPostTitle: string, newPostInf: string) => void
    deletePost: (postId: number) => void
    setIsPostModalOpen: (modalStatus: boolean) => void
}

const PostModal: React.FC<IPost> = (props) => {
    const [isEdit, setIsEditStatus] = useState<boolean>(false)
    const [postTitle, setPostTitle] = useState<string>(props.postTitle)
    const [postInf, setPostInf] = useState<string>(props.postInf)

    const onPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newPostTitle = e.currentTarget.value
        if (newPostTitle === '') newPostTitle = 'Untitled'
        setPostTitle(newPostTitle)
        props.editPost(props.id, postTitle, postInf)
    }
    const onPostInfChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newPostInf = e.currentTarget.value
        if (newPostInf === '') newPostInf = 'This is some text that has no meaning!'
        setPostInf(newPostInf)
        props.editPost(props.id, postTitle, postInf)
    }

    const activateEditMode = () => setIsEditStatus(true)
    const deactivateEditMode = () => setIsEditStatus(false)

    const closeModal = () => props.setIsPostModalOpen(false)

    return (
        <Portal>
            <div className={classes.modalContainer}>
                <div className={classes.modal}>
                    <div className={classes.postPhoto}>
                        <img src={props.postImg ? props.postImg : noPostImg} alt="" />
                    </div>
                    <div className={classes.postInf}>
                        <div className={classes.headWrapper}>
                            <div className={classes.avatar}>
                                <img src={props.avatar} alt="" />
                                <div className={classes.userInf}>
                                    <h4>{props.userName}</h4>
                                    <p>{props.currentDate}</p>
                                </div>
                            </div>
                            <div className={classes.functional_btns}>
                                <p onClick={closeModal}>&times;</p>
                                <Notifications isEdit={isEdit} activateEditMode={activateEditMode} id={props.id} deletePost={props.deletePost} />
                            </div>
                        </div>
                        <div className={classes.horizontal_line}></div>
                        <div className={classes.wrapperMainPostInf}>
                            <div className={classes.postTitle}>
                                {isEdit ? <div className={classes.editPostTitle}>
                                    <input className={classes.editInputs} onChange={onPostTitleChange} value={postTitle} />
                                </div> : <h3 onClick={activateEditMode}>{props.postTitle}</h3>}
                            </div>
                            <div className={classes.postText}>
                                {isEdit ? <div className={classes.editPostInf}>
                                    <textarea className={classes.editInputs} onChange={onPostInfChange} value={postInf} />
                                </div> : <p onClick={activateEditMode}>{props.postInf}</p>}
                            </div>
                        </div>
                        <div className={classes.horizontal_line}></div>
                        <div className={classes.likes_comments}>
                            <div className={classes.likes}>
                                {isEdit ? <div><Btn_Confirm clickFunction={deactivateEditMode} /></div> : <>
                                <FontAwesomeIcon className={classes.iconHeart} icon={faHeart} /><p>{props.likesCount}</p></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default PostModal