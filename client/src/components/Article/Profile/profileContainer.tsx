import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Profile from './profile'
import {
  useGetUsersProfileQuery,
  useGetGenderQuery,
  useGetUsernameQuery,
  useGetUserBackgroundQuery
} from '../../../DAL/profileApi'
import { useFollowUserMutation, useUnfollowUserMutation } from '../../../DAL/usersApi'
import { selectFriends } from '../../../BLL/selectors/users-selectors'
import { selectAuthorizedUserId } from '../../../BLL/selectors/auth-selectors'
import { useAppSelector } from '../../../hooks/hooks'

const ProfileContainer = () => {
  const navigate = useNavigate()
  const { userId: paramUserId } = useParams<{ userId?: string }>()

  const authorizedUserId = useAppSelector(selectAuthorizedUserId)
  const friends = useAppSelector(selectFriends)

  const idToLoad = paramUserId || authorizedUserId

  const {
    data: profile,
    refetch: refetchProfile
  } = useGetUsersProfileQuery(idToLoad, {
    skip: !idToLoad
  })

  const { data: gender, refetch: refetchGender } = useGetGenderQuery(idToLoad, {
    skip: !idToLoad
  })

  const { data: username, refetch: refetchUsername } = useGetUsernameQuery(idToLoad, {
    skip: !idToLoad
  })
  const { data: background, refetch: refetchBackground } = useGetUserBackgroundQuery(idToLoad, {
    skip: !idToLoad
  })

  const [follow] = useFollowUserMutation()
  const [unfollow] = useUnfollowUserMutation()

  useEffect(() => {
    if (!idToLoad) {
      navigate('/login')
    } else {
      refetchProfile()
      refetchGender()
      refetchUsername()
      refetchBackground()
    }
  }, [idToLoad, navigate, refetchProfile, refetchGender, refetchUsername, refetchBackground])

  return (
    <Profile
      follow={follow}
      unfollow={unfollow}
      profile={profile}
      authorizedUserId={authorizedUserId}
      gender={gender}
      username={username}
      friends={friends}
      background={background}
    />
  )
}

export default ProfileContainer