import React from 'react'
import classes from './friend.module.scss'
import defaultUserPhoto from './img/defaultUserPhoto.jpg'
import { NavLink } from 'react-router-dom'
import { Avatar, Container, makeStyles, Theme, createStyles, Button } from '@material-ui/core'

interface IFriend {
    id: number
    avatar: string
    nickname: string
    name: string
    followed: boolean
    follow: (id: number) => void
    unfollow: (id: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        width: '100px',
        height: '100px'
    }
}))

const Friend: React.FC<IFriend> = (props) => {
    const s = useStyles()
    const following = () => {
        if (props.followed === false) props.follow(props.id)
        props.unfollow(props.id)
    }
    return (
        <Container className={classes.container}>
            <div className={classes.user}>
                <NavLink className={classes.navLink} to={"/Profile/" + props.id}>
                    <Avatar className={s.avatar} src={props.avatar ? props.avatar : defaultUserPhoto} alt="avatar" />
                    <h5 className={classes.userName}>{props.nickname ? props.nickname : props.name}</h5>
                </NavLink>
                <Button variant="contained" color="primary" 
                className={classes.btn_following} 
                onClick={following}>{props.followed ? 'Following' : 'Follow'}</Button>
            </div>
        </Container>
    )
}

export default Friend