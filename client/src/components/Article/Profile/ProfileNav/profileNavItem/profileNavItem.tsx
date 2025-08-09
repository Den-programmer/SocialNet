import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Typography } from 'antd'

interface IProfileNavItem {
    id: number
    title: string
    isChosen: boolean
    path: string
    location: string
    changeProfileNavItemChosenStatus: (itemId: number) => void
    choosePage: (LinkId: number) => void
}

const { Text } = Typography

const ProfileNavItem: React.FC<IProfileNavItem> = (props) => {
    useEffect(() => {
        if (props.path === props.location) {
            props.choosePage(props.id)
            props.changeProfileNavItemChosenStatus(props.id)
        }
    }, [props.location, props.path, props.choosePage, props.changeProfileNavItemChosenStatus, props.id])

    return (
        <NavLink 
            to={props.path} 
            onClick={() => props.changeProfileNavItemChosenStatus(props.id)} 
            key={props.id}
        >
            <Menu.Item 
                key={props.id} 
                style={{
                    fontWeight: 'bolder',
                    textTransform: 'uppercase',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    borderBottom: props.isChosen ? '2px solid #4dcadd' : 'none',
                    color: props.isChosen ? '#4dcadd' : '#222222',
                    backgroundColor: 'transparent',
                    padding: '0 20px'
                }}
            >
                <Text 
                    style={{
                        color: props.isChosen ? '#4dcadd' : '#222222'
                    }}
                >
                    {props.title}
                </Text>
            </Menu.Item>
        </NavLink>
    )
}

export default ProfileNavItem