import React from 'react'
import User from './user/user'
import { userType } from '../../../../../../types/FriendsType/friendsType'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'

interface UsersColumnPropsType {
    users: Array<userType>
    followingInProcess: Array<number>
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    startDialog: (userId: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))

const UsersColumn: React.FC<UsersColumnPropsType> = (props) => {
    const classes = useStyles()
    const users = props.users.map((user: userType) => {
        return <User id={user.id}
            followThunk={props.followThunk}
            unfollowThunk={props.unfollowThunk}
            key={user.id}
            followingInProcess={props.followingInProcess}
            followed={user.followed}
            nickname={user.nickname}
            name={user.name}
            photo={user.photos.large} startDialog={props.startDialog} />
    })
    return (
        <Container className={classes.container}>
            {users}
        </Container>
    )
}

export default UsersColumn