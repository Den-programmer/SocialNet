import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'
import AddPost from './AddPost/addPost'
import defaultUser from '../images/withoutAvatar/defaultUserPhoto.jpg'
import { postType, profileType } from '../../../../BLL/reducer-profile'

interface IMyPosts {
    userName: string
    posts: Array<postType>
    profile: profileType
    isAddPostModalOpen: boolean
    isPostModalOpen: boolean
    currentDate: string
    messageError: string
    deletePost: (postId: number) => void
    editPost: (postId: number, newPostTitle: string, newPostInf: string) => void
    addPost: (postName: string, postInf: string, postPhoto: string) => void
    setIsAddPostWindowOpen: (status: boolean) => void
    setIsPostModalOpen: (modalStatus: boolean) => void
    setTextError: (text: string) => void
}

const MyPosts: React.FC<IMyPosts> = React.memo(props => {
    const posts = props.posts.map((post: postType) => {
        return <Post userName={props.userName} id={post.id} key={post.id}
            postTitle={post.postTitle}
            postInf={post.postInf}
            postImg={post.postImg}
            likesCount={post.likesCount} avatar={props.profile.photos.large ? props.profile.photos.large : defaultUser} 
            currentDate={props.currentDate}
            deletePost={props.deletePost} editPost={props.editPost} isModalOpen={props.isPostModalOpen} setIsPostModalOpen={props.setIsPostModalOpen}/>
    })
    const onAddPost = () => props.setIsAddPostWindowOpen(true)
    return (
        <div className={classes.postPage}>
            <div className={classes.addPost}>
                <button className={classes.btn_addPost} onClick={onAddPost}>Add Post</button>
                {props.isAddPostModalOpen && <AddPost addPost={props.addPost} 
                setIsAddPostWindowOpen={props.setIsAddPostWindowOpen} 
                messageError={props.messageError}
                setTextError={props.setTextError}/>}
            </div>
            <div className={classes.posts}>
                {posts.length !== 0 ? posts : <div className={classes.postedNothingBlock}><h2 className={classes.postedNothingTitle}>You haven't posted anything yet!</h2></div>}
            </div>
        </div>
    )
})

export default MyPosts