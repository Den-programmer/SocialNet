import React from 'react'
import { Row, Col, Typography } from 'antd'
import User from './user/user'
import { userType } from '../../../../../../types/FriendsType/friendsType'
import { useFollowUserMutation, useUnfollowUserMutation, useGetUsersQuery } from '../../../../../../DAL/usersApi'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { selectFollowingInProcess, selectUsersFilter, selectUsersInf } from '../../../../../../BLL/selectors/users-selectors'
import Preloader from '../../../../../common/preloader/preloader'
import { selectAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'

const { Title } = Typography

interface UsersColumnPropsType { }

const UsersColumn: React.FC<UsersColumnPropsType> = ({ }) => {
    const userId = useAppSelector(selectAuthorizedUserId)
    const pageSize = useAppSelector(selectUsersInf).pageSize
    const currentPage = useAppSelector(selectUsersInf).currentPage
    const term = useAppSelector(selectUsersFilter).term
    const { data, isLoading } = useGetUsersQuery({ pageSize, currentPage, term })

    let users = data?.items || []

    const filteredUsers = Array.isArray(users) ? users.filter((user: userType) => user.id !== userId) : []

    const followingInProcess = useAppSelector(selectFollowingInProcess)

    const [followThunk] = useFollowUserMutation()
    const [unfollowThunk] = useUnfollowUserMutation()
    
    if (filteredUsers.length === 0) {
        return (
            <Row justify="center" style={{ marginTop: '32px' }}>
                <Title level={3} style={{ color: '#222' }}>
                    There's no such users!
                </Title>
            </Row>
        )
    }

    if (isLoading) return <Preloader />

    return (
        <Row gutter={[16, 16]} justify="center" style={{ padding: '20px' }}>
            {filteredUsers.map((user: userType) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.id}>
                    <User
                        id={user.id}
                        followThunk={followThunk}
                        unfollowThunk={unfollowThunk}
                        followingInProcess={followingInProcess}
                        followed={user.followed}
                        username={user.username}
                        photo={user.profile.photos.large}
                    />
                </Col>
            ))}
        </Row>
    )
}

const UsersColumnWithApollo: React.FC<UsersColumnPropsType> = (props) => {
    return (
        <UsersColumn {...props} />
    )
}

export default UsersColumnWithApollo