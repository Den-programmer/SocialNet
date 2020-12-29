import React from 'react'
import classes from './wall.module.scss'
import MyPostsContainer from './MyPosts/MyPostsContainer'

interface IWall {

}

const Wall: React.FC<IWall> = (props) => {
    return (
        <div className={classes.wallPage}>
            <MyPostsContainer />
        </div>
    )
}

export default Wall 