import React, { ChangeEvent, createRef } from 'react'
import classes from './Post.module.scss'
import { Container, Avatar, makeStyles, createStyles, Theme, TextField } from '@material-ui/core'

interface IPost {
    userName: string
    postTitle: string
    postInf: string
    postImg: string | File
    isEditPostTitle: boolean
    isEditPostInf: boolean
    id: number
    createdAt: string
    likesCount: number
    avatar: string | undefined | File
    isModalOpen: boolean
    setIsPostModalOpen: (modalStatus: boolean) => void
    deletePost: (postId: number) => void
    setIsPostTitleEdited: (postId: number, status: boolean) => void
    setIsPostInfEdited: (postId: number, status: boolean) => void
    onPostTitleChange: (postId: number, postContent: string) => void
    onPostInfChange: (postId: number, postContent: string) => void
    finishEditing: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    avatar: {
        width: '75px',
        height: '75px'
    }
}))

const defaultUserPhoto = process.env.REACT_APP_CLOUDINARY_DEFAULT_USER
// Edit post - false when I click on something that is not post input!

const noPostImg = process.env.REACT_APP_CLOUDINARY_NO_PHOTO_URL

const Post: React.FC<IPost> = (props) => {
    const s = useStyles()
    const postContent = createRef<HTMLDivElement>()

    const onPostTitleChange = (e: ChangeEvent<HTMLInputElement>) => props.onPostTitleChange(props.id, e.currentTarget.value)
    const onPostInfChange = (e: ChangeEvent<HTMLInputElement>) => props.onPostInfChange(props.id, e.currentTarget.value)

    document.addEventListener('click', (e: any) => {
        let node = postContent.current
        if (node) {
            if (node && !node.contains(e.target)) {
                props.finishEditing()
            }
        }
    })
    const imageUrl = typeof props.postImg === 'string'
        ? props.postImg
        : props.postImg instanceof File
            ? URL.createObjectURL(props.postImg)
            // @ts-ignore
            : props.postImg.data && props.postImg.contentType
                // @ts-ignore
                ? `data:${props.postImg.contentType};base64,${Buffer.from(props.postImg.data).toString('base64')}`
                : noPostImg
    const imageAvatarUrl = typeof props.avatar === 'string'
        ? props.avatar
        : props.avatar instanceof File
            ? URL.createObjectURL(props.avatar)
            // @ts-ignore
            : props.avatar.data && props.avatar.contentType
                // @ts-ignore
                ? `data:${props.avatar.contentType};base64,${Buffer.from(props.avatar.data).toString('base64')}`
                : defaultUserPhoto
    return (
        <Container>
            <div className={classes.post}>
                <div className={classes.postHeaderWrapper}>
                    <div className={classes.postHeader}>
                        <div className={classes.avatar}>
                            <Avatar className={s.avatar} src={imageAvatarUrl} alt="avatar" />
                            <h6>{props.userName}</h6>
                        </div>
                        <div className={classes.date}>
                            <p>{props.createdAt}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.postBody}>
                    <div className={classes.picture}>
                        <img loading="lazy" src={imageUrl} alt="avatar" />
                    </div>
                    <div className={classes.postContentWrapper}>
                        <div ref={postContent} className={classes.postContent}>
                            <div onClick={() => props.setIsPostTitleEdited(props.id, true)} className={classes.postTitleContainer}>
                                {props.isEditPostTitle ? <TextField onChange={onPostTitleChange} label={props.postTitle} variant="outlined" /> :
                                    <h3 className={classes.postTitle}>{props.postTitle}</h3>}
                            </div>
                            <div className={classes.horizontal_line}></div>
                            <div onClick={() => props.setIsPostInfEdited(props.id, true)} className={classes.postInfContainer}>
                                {props.isEditPostInf ? <TextField onChange={onPostInfChange} variant="outlined" /> :
                                    <p className={classes.postInf}>{props.postInf}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default Post