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
    return (
        <div style={{ borderRight: '1px solid #E3E3E3', padding: '1rem 0' }}>
            <Title level={3} style={{ paddingLeft: '1rem' }}>
                Options
            </Title>
            <Menu
                mode="vertical"
                style={{ borderRight: 0 }}
                selectedKeys={[location.pathname]}
            >
                <Menu.Item key="/Options/account" icon={<UserOutlined />}>
                    <NavLink to="/Options/account">My profile options</NavLink>
                </Menu.Item>
                <Menu.Item key="/Options/general" icon={<SettingOutlined />}>
                    <NavLink to="/Options/general">General options</NavLink>
                </Menu.Item>
                <Menu.Item key="/Options/security" icon={<LockOutlined />}>
                    <NavLink to="/Options/security">Security options</NavLink>
                </Menu.Item>
                <Menu.Item key="/Options/contacts" icon={<ContactsOutlined />}>
                    <NavLink to="/Options/contacts">Contacts options</NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default OptionsNav
