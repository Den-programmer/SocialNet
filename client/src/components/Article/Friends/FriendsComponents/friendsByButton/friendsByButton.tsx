import React from 'react'
import Friend from './Friend/friend'
import NoFriendsComponent from './NOfriendsComponent/NOfriendsComponent'
import { userType } from '../../../../../types/FriendsType/friendsType'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'

interface IFriendsByButton {
    friends: Array<userType>
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        minHeight: '50vh'
    }
}))

const FriendsByButton: React.FC<IFriendsByButton> = (props) => {
    const classes = useStyles()
    const friends = props.friends.map((f: userType) => {
        return <Friend id={f.id}
            key={f.id}
            nickname={f.nickname}
            name={f.name}
            avatar={f.photos.large}
            followed={f.followed}
            follow={props.followThunk}
            unfollow={props.unfollowThunk} />
    })
  
    return (
        <Container className={classes.container}>
            {friends.length !== 0 ? friends : <NoFriendsComponent />}
        </Container>
    )
}

export default FriendsByButton