import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Typography } from 'antd'
import {
    UserOutlined,
    SettingOutlined,
    LockOutlined,
    ContactsOutlined
} from '@ant-design/icons'

const { Title } = Typography

const OptionsNav: React.FC = () => {
    const menuItems = [
        {
            key: '/Options/account',
            icon: <UserOutlined />,
            label: <NavLink to="/Options/account">My profile options</NavLink>,
        },
        {
            key: '/Options/general',
            icon: <SettingOutlined />,
            label: <NavLink to="/Options/general">General options</NavLink>,
        },
        {
            key: '/Options/security',
            icon: <LockOutlined />,
            label: <NavLink to="/Options/security">Security options</NavLink>,
        },
        {
            key: '/Options/contacts',
            icon: <ContactsOutlined />,
            label: <NavLink to="/Options/contacts">Contacts options</NavLink>,
        },
    ]

    return (
        <div style={{ borderRight: '1px solid #E3E3E3', padding: '1rem 0' }}>
            <Title level={3} style={{ paddingLeft: '1rem' }}>
                Options
            </Title>
            <Menu
                mode="vertical"
                style={{ borderRight: 0 }}
                selectedKeys={[location.pathname]}
                items={menuItems}
            />
        </div>
    )
}

export default OptionsNav
