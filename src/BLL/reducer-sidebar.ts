import React from 'react'
import { navLinkType } from '../types/SidebarTypes/sidebarTypes'
import { InferActionTypes } from './redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SettingsIcon from '@material-ui/icons/Settings'
import PeopleIcon from '@material-ui/icons/People'

type SidebarType = {
    navigationLinks: Array<navLinkType>
    isSidebarOpen: boolean
    sidebarWidth: number
}

const Sidebar = {
    navigationLinks: [
        {
            id: 1,
            name: 'Profile',
            path: '/Profile',
            icon: AccountCircleIcon,
            isChosen: true
        },
        {
            id: 2,
            name: 'Messages',
            path: '/Messages',
            icon: EmailIcon,
            isChosen: false
        },
        {
            id: 3,
            name: 'Friends',
            path: '/Friends/DataFriends',
            icon: PeopleIcon,
            isChosen: false
        },
        {
            id: 4,
            name: 'Notifications',
            path: '/Notifications',
            icon: NotificationsIcon,
            isChosen: false
        },
        {
            id: 5,
            name: 'News',
            path: '/News',
            icon: NewReleasesIcon,
            isChosen: false
        },
        {
            id: 6,
            name: 'Music',
            path: '/Music',
            icon: MusicNoteIcon,
            isChosen: false
        },
        {
            id: 7,
            name: 'Options',
            path: '/Options/account',
            icon: SettingsIcon,
            isChosen: false
        }
    ],
    isSidebarOpen: false,
    sidebarWidth: 240
} as SidebarType

const reducerSidebar = (state = Sidebar, action: ActionsType): SidebarType => {
    switch (action.type) {
        case `sn/sidebar/ADD_SIDEBAR_NAVLINK`:
            const newLink = {
                id: state.navigationLinks.length + 1,
                name: action.title,
                path: action.path,
                icon: action.icon,
                isChosen: false
            }
            return {
                ...state,
                navigationLinks: [...state.navigationLinks, newLink]
            }
        case `sn/sidebar/DELETE_SIDEBAR_NAVLINK`:
            return {
                ...state,
                navigationLinks: state.navigationLinks.filter(item => item.id !== action.id)
            }
        case `sn/sidebar/CHANGE_SIDEBAR_OPEN_STATUS`:  
            return {
                ...state,
                isSidebarOpen: action.status
            }
        case `sn/sidebar/CHOOSE_PAGE`:
            return {
                ...state,
                navigationLinks: state.navigationLinks.map((link: navLinkType) => {
                    if(action.linkId === link.id) return { ...link, isChosen: true }
                    return { ...link, isChosen: false }
                })
            }
        default:
            return state
    }
}

type ActionsType = InferActionTypes<typeof actions>

export const actions = {
    addSideBarNavLink: (title: string, path: string, icon: React.ComponentType) => ({ type: `sn/sidebar/ADD_SIDEBAR_NAVLINK`, title, path, icon } as const),
    deleteSideBarNavLink: (id: number) => ({ type: `sn/sidebar/DELETE_SIDEBAR_NAVLINK`, id } as const),
    changeSidebarIsOpenStatus: (status: boolean) => ({ type: `sn/sidebar/CHANGE_SIDEBAR_OPEN_STATUS`, status } as const),
    choosePage: (linkId: number) => ({ type: `sn/sidebar/CHOOSE_PAGE`, linkId } as const)
}

export default reducerSidebar