import React from 'react'
import User from './user/user'
import './usersColumn.scss'
import { userType } from '../../../../../../types/FriendsType/friendsType'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'

interface UsersColumnPropsType {
    users: Array<userType>
    userId: string
    followingInProcess: Array<string>
    followThunk: (id: string) => void
    unfollowThunk: (id: string) => void
    startDialog: (userId: string) => void
    createNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    addToBlacklist: (itemId: string) => void
}

const UsersColumn: React.FC<UsersColumnPropsType> = (props) => {
    const useStyles = makeStyles((theme: Theme) => createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px',
            width: '100%'
        },
        userGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            padding: '20px',
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto'
        }
    }))

    const classes = useStyles()

    const users = props.users.map((user: userType) => {
        if (user.id !== props.userId) {
            return <User id={user.id}
                followThunk={props.followThunk}
                unfollowThunk={props.unfollowThunk}
                key={user.id}
                createNotification={props.createNotification}
                followingInProcess={props.followingInProcess}
                followed={user.followed}
                username={user.username}
                photo={user.profile.photos.large}
                startDialog={props.startDialog}
                addToBlacklist={props.addToBlacklist} />
        }
    })

    return (
        <Container className={classes.container}>
            {users.length === 0 ? <h3 style={{ color: '#222222' }}>There's no such users!</h3> : <div className={classes.userGrid}>{users}</div>}
        </Container>
    )
}

export default UsersColumn