import React, { useEffect } from 'react'
import classes from './MyPosts.module.scss'
import Post from './Post/Post'
import AddPost from './AddPost/addPost'
import defaultUser from '../../images/withoutAvatar/defaultUserPhoto.jpg'
import { postType, profileType } from '../../../../../types/ProfileTypes/profileTypes'
import { Container, TextField, Theme, createStyles, makeStyles } from '@material-ui/core'

interface IMyPosts {
    userName: string
    userId: any
    posts: Array<postType>
    profile: profileType
    isAddPostModalOpen: boolean
    isPostModalOpen: boolean
    messageError: string
    deletePost: (postId: number) => void
    // editPost: (postId: number, newPostTitle: string, newPostInf: string) => void
    createPost: (userId: string, newPostTitle: string, newPostInformat: string, postPhoto: File) => void
    setIsAddPostWindowOpen: (status: boolean) => void
    setIsPostModalOpen: (modalStatus: boolean) => void
    setTextError: (text: string) => void
    setIsPostTitleEdited: (postId: number, status: boolean) => void
    setIsPostInfEdited: (postId: number, status: boolean) => void
    finishEditing: () => void
    onPostTitleChange: (postId: number, postContent: string) => void
    onPostInfChange: (postId: number, postContent: string) => void
    requireUsersPosts: (userId: string) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    textfield: {
        width: '100%',
        margin: '50px 0px'
    }
}))

const MyPosts: React.FC<IMyPosts> = React.memo(props => {
    const s = useStyles()
    let postImg
    const posts = props.posts.map((post: postType) => {
        postImg = post.postImg
        return <Post userName={props.userName} id={post.id} key={post.id}
            postTitle={post.postTitle}
            postInf={post.postInf}
            postImg={post.postImg}
            createdAt={post.createdAt}
            isEditPostTitle={post.isEditTitle}
            isEditPostInf={post.isEditPostInf}
            likesCount={post.likesCount} avatar={props.profile.photos.large ? props.profile.photos.large : defaultUser}
            deletePost={props.deletePost} 
            setIsPostInfEdited={props.setIsPostInfEdited} 
            setIsPostTitleEdited={props.setIsPostTitleEdited} 
            finishEditing={props.finishEditing}
            onPostTitleChange={props.onPostTitleChange}
            onPostInfChange={props.onPostInfChange}
            isModalOpen={props.isPostModalOpen} 
            setIsPostModalOpen={props.setIsPostModalOpen} />
    })
    useEffect(() => {
        props.requireUsersPosts(props.userId)
    }, [])
    const onAddPost = () => props.setIsAddPostWindowOpen(true)
    return (
        <div className={classes.postPage}>
            <div className={classes.addPost}>
                <Container>
                    <div className={classes.content}>
                        <TextField onClick={onAddPost} className={s.textfield} label="What is on your mind?" InputProps={{ readOnly: true }} variant="filled" />
                    </div>
                </Container>
                {props.isAddPostModalOpen && <AddPost userId={props.userId} addPost={props.createPost}
                    setIsAddPostWindowOpen={props.setIsAddPostWindowOpen}
                    messageError={props.messageError}
                    setTextError={props.setTextError} />}
            </div>
            <div className={classes.posts}>
                {posts.length !== 0 ? posts : <div className={classes.postedNothingBlock}><h2 className={classes.postedNothingTitle}>There's no posts yet!</h2></div>}
            </div>
        </div>
    )
})

export default MyPosts