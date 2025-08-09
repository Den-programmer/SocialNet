import React from 'react'
import classes from './wall.module.scss'
import MyPosts from './MyPosts/MyPosts'
import { useAppSelector } from '../../../../hooks/hooks'
import { selectIsAddPostModalOpenStatus, selectIsPostModalOpenStatus, selectUsersName, selectUsersProfile } from '../../../../BLL/selectors/profile-selectors'
import { useParams } from 'react-router-dom'


interface IWall {

}

const Wall: React.FC<IWall> = () => {
    const { userId } = useParams<{ userId: string }>()
    const username = useAppSelector(selectUsersName)
    const isAddPostModalOpen = useAppSelector(selectIsAddPostModalOpenStatus)
    const isPostModalOpen = useAppSelector(selectIsPostModalOpenStatus)
    const profile = useAppSelector(selectUsersProfile)


    return (
        <div className={classes.wallPage}>
            <MyPosts isAddPostModalOpen={isAddPostModalOpen}
            isPostModalOpen={isPostModalOpen}
            profile={profile}
            userName={username}
            userId={userId}
            />
        </div>
    )
}

export default Wall 