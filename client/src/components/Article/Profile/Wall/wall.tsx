import React from 'react'
import classes from './wall.module.scss'
import MyPosts from './MyPosts/MyPosts'
import { useAppSelector } from '../../../../hooks/hooks'
import { selectIsAddPostModalOpenStatus, selectIsPostModalOpenStatus, selectUsersName, selectUsersProfile } from '../../../../BLL/selectors/profile-selectors'
import { useParams } from 'react-router-dom'
import {
    useGetGenderQuery,
    useGetUserBackgroundQuery,
    useGetUsersProfileQuery,
    useGetUsernameQuery
} from '../../../../DAL/profileApi'
// import SemanticSearch from './SemanticSearch/semanticSearch'
import { selectAuthorizedUserId } from '../../../../BLL/selectors/auth-selectors'


const Wall: React.FC = () => {
    const { userId: rawRouteUserId } = useParams<{ userId: string }>()
    const username = useAppSelector(selectUsersName)
    const isAddPostModalOpen = useAppSelector(selectIsAddPostModalOpenStatus)
    const isPostModalOpen = useAppSelector(selectIsPostModalOpenStatus)
    const profile = useAppSelector(selectUsersProfile)
    const authorizedUserId = useAppSelector(selectAuthorizedUserId)
    const routeUserId = rawRouteUserId && rawRouteUserId !== 'undefined' ? rawRouteUserId : ''
    const routeUserIdIsValid = Boolean(routeUserId)
    const profileUserId = routeUserIdIsValid
        ? routeUserId
        : authorizedUserId !== '0' && authorizedUserId !== 'undefined'
            ? authorizedUserId || ''
            : ''
    const { data: routeProfile } = useGetUsersProfileQuery(profileUserId, { skip: !profileUserId })
    const { data: routeUsername } = useGetUsernameQuery(profileUserId, { skip: !profileUserId })
    useGetGenderQuery(profileUserId, { skip: !profileUserId })
    useGetUserBackgroundQuery(profileUserId, { skip: !profileUserId })

    return (
        <div className={classes.wallPage}>
        {/* <SemanticSearch /> */}
            <MyPosts isAddPostModalOpen={isAddPostModalOpen}
            isPostModalOpen={isPostModalOpen}
            profile={routeProfile || profile}
            userName={routeUsername || username}
            profileUserId={profileUserId}
            />
        </div>
    )
}

export default Wall 