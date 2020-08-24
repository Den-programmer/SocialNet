import React, { useState } from 'react'
import classes from './notifications.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

interface INotifications {
    id: number
    isEdit: boolean
    activateEditMode: () => void
    deletePost: (postId: number) => void
}

const Notifications: React.FC<INotifications> = (props) => {
    const [isMenuHidden, setIsMenuHiddenStatus] = useState<boolean>(true)
    const toggleMenuEmersion = () => {
        setIsMenuHiddenStatus(!isMenuHidden)
    }
    const editPost = () => {
        toggleMenuEmersion()
        props.activateEditMode()
    }
    const deletePost = () => {
        props.deletePost(props.id)
    }
    return (
        <div className={classes.notification}>
            <FontAwesomeIcon onClick={toggleMenuEmersion} className={classes.notificationIcon} icon={faEllipsisV} />
            {!isMenuHidden &&
                <div className={classes.menu}>
                    <h3>Options</h3>
                    <ul className={classes.menuList}>
                        <li onClick={deletePost} className={classes.menuItem} title="Delete post!">
                            Delete Post
                        </li>
                        <li onClick={editPost} className={classes.menuItem} title="Edit post!">
                            Edit Post
                        </li>
                        <li className={classes.menuItem} title="Delete post!">
                            Copy the post text
                        </li>
                        <li className={classes.menuItem} title="Delete post!">
                            Delete Post4
                        </li>
                        <li className={classes.menuItem} title="Delete post!">
                            Delete Post5
                        </li>
                    </ul>
                </div>}
        </div>
    )
}

export default Notifications