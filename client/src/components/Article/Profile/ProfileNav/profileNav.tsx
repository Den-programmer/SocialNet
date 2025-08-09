import React from 'react'
import { Layout, Menu } from 'antd'
import { profileNavItem } from '../../../../types/ProfileTypes/profileTypes'
import { useLocation, useNavigate } from 'react-router-dom'
import { sidebarActions } from '../../../../BLL/reducer-sidebar'
import { profileActions } from '../../../../BLL/reducer-profile'
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks'
import { selectProfileNavigationMenu } from '../../../../BLL/selectors/profile-selectors'

const { Header } = Layout

const ProfileNav: React.FC = () => {
    const dispatch = useAppDispatch()
    const profileNav = useAppSelector(selectProfileNavigationMenu)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { changeProfileNavItemChosenStatus } = profileActions
    const { choosePage } = sidebarActions

    const menuItems = profileNav.map((item: profileNavItem) => ({
        key: item.id,
        label: item.title,
        onClick: () => {
            dispatch(changeProfileNavItemChosenStatus(item.id))
            dispatch(choosePage(item.id))
            navigate(item.path)
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