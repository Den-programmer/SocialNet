import React from 'react'
import { Layout, Menu } from 'antd'
import { profileNavItem } from '../../../../types/ProfileTypes/profileTypes'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { sidebarActions } from '../../../../BLL/reducer-sidebar'
import { profileActions } from '../../../../BLL/reducer-profile'
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks'
import { selectProfileNavigationMenu, selectUsersProfile } from '../../../../BLL/selectors/profile-selectors'
import { selectAuthorizedUserId } from '../../../../BLL/selectors/auth-selectors'

const { Header } = Layout

const ProfileNav: React.FC = () => {
    const dispatch = useAppDispatch()
    const profileNav = useAppSelector(selectProfileNavigationMenu)
    const profile = useAppSelector(selectUsersProfile)
    const authorizedUserId = useAppSelector(selectAuthorizedUserId)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { userId: routeUserId } = useParams<{ userId?: string }>()
    const routeUserIdIsValid = Boolean(routeUserId && routeUserId !== 'undefined')
    const profileUserId = routeUserIdIsValid
        ? routeUserId
        : profile.userId !== '0' && profile.userId !== 'undefined'
            ? profile.userId
            : authorizedUserId

    const { changeProfileNavItemChosenStatus } = profileActions
    const { choosePage } = sidebarActions

    const menuItems = profileNav.map((item: profileNavItem) => ({
        key: item.id,
        label: item.title,
        onClick: () => {
            dispatch(changeProfileNavItemChosenStatus(item.id))
            dispatch(choosePage(item.id))
            const path = item.path === '/Profile' || item.path === '/Wall'
                ? profileUserId && profileUserId !== '0' && profileUserId !== 'undefined'
                    ? `${item.path}/${profileUserId}`
                    : item.path
                : item.path
            navigate(path)
        },
    }))

    return (
        <Header style={{ backgroundColor: '#FAFAFA', padding: '0 15%' }}>
            <Menu
                mode="horizontal"
                style={{ width: '100%', justifyContent: 'center' }}
                selectedKeys={[pathname]}
                items={menuItems}
            />
        </Header>
    )
}

export default ProfileNav