import React, { Component } from 'react'
import classes from './user.module.css'
import { NavLink } from 'react-router-dom'

interface UserPropType {
    id: number
    userDialogId: number | null
    photo: string
    hasNewMessages: boolean
    lastDialogActivity: string
    lastUserActivityDate: string
    newMessagesCount: number
    userName: string
    lastMessage: string | null | undefined
    setUserDialogId: (userId: number) => void
    getDialogMessages: (userId: number) => void
}

interface IState {
    isUserActive: boolean
}

class User extends Component<UserPropType> {
    state = {
        isUserActive: false
    } as IState

    path = "/Messages/dialog/" + this.props.id
    
    getUserMessages = () => {
        this.props.setUserDialogId(this.props.id)
        this.props.getDialogMessages(this.props.id)
        // if(this.props.id === this.props.userDialogId) {
        //     this.setState({ isUserActive: true })
        // } else {
        //     this.setState({ isUserActive: false })
        // }
    }

    render() {
        return (
            <NavLink onClick={this.getUserMessages} to={this.path}>
                <div className={`${classes.user} ${this.state.isUserActive && classes.active}`}>
                    <div className={classes.avatar}>
                        <img src={this.props.photo} alt="user" />
                    </div>
                    <div className={classes.userInf}>
                        <h3 className={classes.userName}>{this.props.userName}</h3>
                        <p className={classes.lastMessage}>{this.props.lastMessage}</p>
                    </div>
                </div>
            </NavLink>
        )
    }
}


export default User