import FriendsNav from './FriendsNav/friendsNav'
import FriendsComponents from './FriendsComponents/friendsComponents'
import { useAuthRedirect } from '../../../hooks/hooks'

const Friends = () => {
    useAuthRedirect()
    return (
        <div>
            <FriendsNav />
            <FriendsComponents />
        </div>
    )
}

export default Friends