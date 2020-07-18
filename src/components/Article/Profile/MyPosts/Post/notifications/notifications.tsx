import React from 'react'
import classes from './notifications.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

interface INotifications {
    id: number
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
            hidden: true
        }
    } as IState
    toggleMenuEmersion = () => {
        if(this.state.menu.hidden) {
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
                    <div onClick={this.deletePost} className={classes.menuItem} title="Delete post!">
                        Delete Post
                    </div>
                    <div onClick={this.editPost} className={classes.menuItem} title="Delete post!">
                        Edit Post
                    </div>
                    <div className={classes.menuItem} title="Delete post!">
                        Copy the post text
                    </div>
                    <div className={classes.menuItem} title="Delete post!">
                        Delete Post4
                    </div>
                    <div className={classes.menuItem} title="Delete post!">
                        Delete Post5
                    </div>
                </div>}
            </div>
        )
    }
}

export default Notifications