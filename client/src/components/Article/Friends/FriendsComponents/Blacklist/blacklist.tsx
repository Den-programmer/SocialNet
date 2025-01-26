import { Container, createStyles, makeStyles, Button, Avatar } from '@material-ui/core'
import React from 'react'
import classes from '../../FriendsComponents/friendsByButton/Friend/friend.module.scss'
import { NavLink } from 'react-router-dom'
import { userType } from '../../../../../types/FriendsType/friendsType'
import defaultUserPhoto from '../../../../Article/Profile/images/withoutAvatar/defaultUserPhoto.jpg'

interface IBlacklist {
    blacklist: Array<userType>
    deleteFromBlacklist: (itemId: string) => void
}

const useStyles = makeStyles(() => createStyles({
    container: {
        minHeight: '100vh'
    },
    avatar: {
        width: '100px',
        height: '100px'
    }
}))

const Blacklist: React.FC<IBlacklist> = ({ blacklist, deleteFromBlacklist }) => {
    const s = useStyles()
    const blackedUsers = blacklist.map((item: userType) => {
        const large = item.profile.photos.large
        const imageUrl = typeof large === 'string'
        ? large
        : large instanceof File
            ? URL.createObjectURL(large)
            // @ts-ignore
            : large.data && large.contentType
            // @ts-ignore
                ? `data:${large.contentType};base64,${Buffer.from(large.data).toString('base64')}`
                : defaultUserPhoto
        return (
            <div className={classes.user}>
                <NavLink className={classes.navLink} to={"/Profile/" + item.id}>
                    <Avatar className={s.avatar} src={imageUrl ? imageUrl : defaultUserPhoto} alt="avatar" />
                    <h5 className={classes.userName}>{item.username}</h5>
                </NavLink>
                <Button onClick={() => deleteFromBlacklist(item.id)} variant="contained" color="secondary">Blacked</Button>
            </div>
        )
    })
    return (
        <Container className={classes.container}>
            {blackedUsers.length === 0 ? <h4 className={classes.noUsersTitle}>No users in the blacklist</h4> : blackedUsers}
        </Container>
    )
}

export default Blacklist