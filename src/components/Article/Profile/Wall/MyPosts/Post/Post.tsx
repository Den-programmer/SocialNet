import React from 'react'
import classes from './Post.module.scss'
import noPostImg from '../../../../../../images/noPhoto/nophoto.png'
import { Container, Avatar, makeStyles, createStyles, Theme } from '@material-ui/core'

interface IPost {
    userName: string
    postTitle: string
    postInf: string
    postImg: string
    id: number
    likesCount: number
    avatar: string
    isModalOpen: boolean
    currentDate: string
    setIsPostModalOpen: (modalStatus: boolean) => void
    editPost: (postId: number, newPostTitle: string, newPostInf: string) => void
    deletePost: (postId: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    avatar: {
        width: '75px',
        height: '75px'
    }
}))

const Post: React.FC<IPost> = (props) => {
    const s = useStyles()
    return (
        <Container>
            <div className={classes.post}>
                <div className={classes.postHeaderWrapper}>
                    <div className={classes.postHeader}>
                        <div className={classes.avatar}>
                            <Avatar className={s.avatar} src={props.avatar} alt="avatar" />
                            <h6>{props.userName}</h6>
                        </div>
                        <div className={classes.date}>
                            <p>29-12-2020</p>
                        </div>
                    </div>
                </div>
                <div className={classes.postBody}>
                    <div className={classes.picture}>
                        <img src={props.postImg ? props.postImg : noPostImg} alt="avatar" />
                    </div>
                    <div className={classes.postContentWrapper}>
                        <div className={classes.postContent}>
                            <h3 className={classes.postTitle}>{props.postTitle}</h3>
                            <div className={classes.horizontal_line}></div>
                            <p className={classes.postInf}>{props.postInf}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default Post