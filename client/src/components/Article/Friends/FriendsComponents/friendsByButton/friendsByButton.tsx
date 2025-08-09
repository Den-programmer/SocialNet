import Friend from './Friend/friend'
import NoFriendsComponent from './NOfriendsComponent/NOfriendsComponent'
import {
  useGetFriendsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation
} from '../../../../../DAL/usersApi'
import { useAuthRedirect } from '../../../../../hooks/hooks'

const FriendsByButton = () => {
  useAuthRedirect()

  const { data: friendsData, isLoading } = useGetFriendsQuery()
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()

  if (isLoading) return null
  if (!friendsData) return <NoFriendsComponent />

  const friends = friendsData.following.map(friend => (
    <Friend
      key={friend.id}
      id={friend.id}
      username={friend.username}
      avatar={friend.profile.photos.large}
      followed={true}
      follow={followUser}
      unfollow={unfollowUser}
    />
  ))

  return (
    <div style={{ minHeight: '50vh' }}>
      {friends.length > 0 ? friends : <NoFriendsComponent />}
    </div>
  )
}

export default FriendsByButton