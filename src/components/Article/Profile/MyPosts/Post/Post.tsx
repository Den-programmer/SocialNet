import React, { Component, MouseEvent } from 'react'
import classes from './Post.module.css'
import noPostImg from '../../../../../images/noPhoto/nophoto.png'
import PostModal from './PostModal/postModal'

interface IPost {
    userName: string
    postTitle: string
    postInf: string
    postImg: any
    id: number
    likesCount: number
    avatar: string
    isModalOpen: boolean
    currentDate: string
    setIsPostModalOpen: (modalStatus: boolean) => void
    editPost: (postId: number, newPostTitle: string, newPostInf: string) => void
    deletePost: (postId: number) => void
}

class Post extends Component<IPost> {
    postClicked = (e: MouseEvent<HTMLDivElement>) => {
        this.props.setIsPostModalOpen(true)
        e.stopPropagation()
    }
    componentWillUnmount() {
        this.props.setIsPostModalOpen(false)
    }
    render() {
        return (
            <div className={classes.post}>
                <img  onClick={this.postClicked} className={classes.postImage} alt="" src={this.props.postImg ? this.props.postImg : noPostImg}/>
                {this.props.isModalOpen && <PostModal 
                userName={this.props.userName}
                postTitle={this.props.postTitle} 
                postInf={this.props.postInf} 
                postImg={this.props.postImg}
                id={this.props.id} avatar={this.props.avatar}
                likesCount={this.props.likesCount} editPost={this.props.editPost}
                deletePost={this.props.deletePost}
                setIsPostModalOpen={this.props.setIsPostModalOpen}
                currentDate={this.props.currentDate}/>}
            </div>
        )
    }
}

export default Post