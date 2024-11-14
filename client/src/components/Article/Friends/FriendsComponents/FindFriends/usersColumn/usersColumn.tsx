import React from 'react'
import User from './user/user'
import './usersColumn.scss'
import { userType } from '../../../../../../types/FriendsType/friendsType'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'

interface UsersColumnPropsType {
    users: Array<userType>
    userId: any
    followingInProcess: Array<number>
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    startDialog: (userId: number) => void
    addNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    addToBlacklist: (itemId: number) => void
}

const UsersColumn: React.FC<UsersColumnPropsType> = (props) => {
    const useStyles = makeStyles((theme: Theme) => createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            padding: '40px'
        }
    }))
    const classes = useStyles()
    const users = props.users.map((user: userType) => {
        if (user.id !== props.userId) {
            return <User id={user.id}
                followThunk={props.followThunk}
                unfollowThunk={props.unfollowThunk}
                key={user.id}
                addNotification={props.addNotification}
                followingInProcess={props.followingInProcess}
                followed={user.followed}
                username={user.username}
                photo={user.profile.photos.large} startDialog={props.startDialog} addToBlacklist={props.addToBlacklist} />
        }
    })
    return (
        <Container className={classes.container}>
            {users.length === 0 ? <h3 style={{ color: '#222222' }}>There's no such users!</h3> : <div className='user-grid'>{users}</div>}
        </Container>
    )
}

export default UsersColumn