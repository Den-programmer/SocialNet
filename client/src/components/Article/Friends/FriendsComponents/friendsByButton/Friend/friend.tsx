import React from 'react'
import classes from './friend.module.scss'
import defaultUserPhoto from './img/defaultUserPhoto.webp'
import { NavLink } from 'react-router-dom'
import { Avatar, Container, makeStyles, Theme, createStyles, Button } from '@material-ui/core'

interface IFriend {
    id: string
    avatar: string | File
    username: string
    followed: boolean
    follow: (userId: string) => void
    unfollow: (userId: string) => void
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
    const imageUrl = typeof props.avatar === 'string'
        ? props.avatar
        : props.avatar instanceof File
            ? URL.createObjectURL(props.avatar)
            // @ts-ignore
            : props.avatar.data && props.avatar.contentType
            // @ts-ignore
                ? `data:${props.avatar.contentType};base64,${Buffer.from(props.avatar.data).toString('base64')}`
                : defaultUserPhoto
    return (
        <Container className={classes.container}>
            <div className={classes.user}>
                <NavLink className={classes.navLink} to={"/Profile/" + props.id}>
                    <Avatar className={s.avatar} src={imageUrl ? imageUrl : defaultUserPhoto} alt="avatar" />
                    <h5 className={classes.userName}>{props.username}</h5>
                </NavLink>
                <Button variant="contained" color="primary" 
                className={classes.btn_following} 
                onClick={following}>{props.followed ? 'Following' : 'Follow'}</Button>
            </div>
        </Container>
    )
}

export default Friend