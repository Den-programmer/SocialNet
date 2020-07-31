import React from 'react'
import classes from './notifications.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

interface INotifications {
    id: number
    isEdit: boolean
    activateEditMode: () => void
    deletePost: (postId: number) => void
}
interface IState {
    menu: {
        hidden: boolean
    }
}

class Notifications extends React.Component<INotifications> {
    state = {
        menu: {
            hidden: this.props.isEdit
        }
    } as IState
    toggleMenuEmersion = () => {
        if (this.state.menu.hidden) {
            this.setState({
                menu: {
                    hidden: false
                }
            })
        } else {
            this.setState({
                menu: {
                    hidden: true
                }
            })
        }
    }
    editPost = () => {
        this.toggleMenuEmersion()
        this.props.activateEditMode()
    }
    deletePost = () => {
        this.props.deletePost(this.props.id)
    }
    render() {
        return (
            <div className={classes.notification}>
                <FontAwesomeIcon onClick={this.toggleMenuEmersion} className={classes.notificationIcon} icon={faEllipsisV} />
                {this.state.menu.hidden ? null :
                    <div className={classes.menu}>
                        <h3>Options</h3>
                        <ul className={classes.menuList}>
                            <li onClick={this.deletePost} className={classes.menuItem} title="Delete post!">
                                Delete Post
                            </li>
                            <li onClick={this.editPost} className={classes.menuItem} title="Edit post!">
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
}

export default Notifications