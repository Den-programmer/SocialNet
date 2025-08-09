import classes from './friendsComponents.module.css'
import FriendsByButton from './friendsByButton/friendsByButton'
import FindFriends from './FindFriends/findFriends'
import { useAuthRedirect } from '../../../../hooks/hooks'

const FriendsComponents= () => {
    useAuthRedirect()
    return (
        <div className={classes.friendsComponents}>
            <FriendsByButton />
            <FindFriends />
        </div>
    )
}

export default FriendsComponents