import React, { useEffect } from 'react'
import Friend from './Friend/friend'
import NoFriendsComponent from './NOfriendsComponent/NOfriendsComponent'
import { FriendsFilter, UsersInfType, userType } from '../../../../../types/FriendsType/friendsType'
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core'

interface IFriendsByButton {
    friends: Array<userType>
    usersInf: UsersInfType
    filter: FriendsFilter
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    requestFollowing: (pageSize: number, currentPage: number, term: string) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        minHeight: '50vh'
    }
}))

const FriendsByButton: React.FC<IFriendsByButton> = (props) => {
    const classes = useStyles()
    useEffect(() => {
        props.requestFollowing(props.usersInf.pageSize, props.usersInf.currentPage, props.filter.term)
    }, [props.usersInf.currentPage])
    const friends = props.friends.map((f: userType) => {
        return <Friend id={f.id}
            key={f.id}
            username={f.username}
            avatar={f.profile.photos.large}
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