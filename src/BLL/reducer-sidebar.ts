import { navLinkType } from '../types/SidebarTypes/sidebarTypes'
import { InferActionTypes } from './redux';

type SidebarType = {
    navigationLinks: Array<navLinkType>
}

let Sidebar = {
    navigationLinks: [
        {
            id: 1,
            name: 'Profile',
            path: '/Profile',
        },
        {
            id: 2,
            name: 'Messages',
            path: '/Messages',
        },
        {
            id: 3,
            name: 'News',
            path: '/News',
        },
        {
            id: 4,
            name: 'Music',
            path: '/Music',
        },
        {
            id: 5,
            name: 'Options',
            path: '/Options'
        }
    ]
} as SidebarType

const reducerSidebar = (state = Sidebar, action: ActionsType): SidebarType => {
    switch (action.type) {
        case `sn/sidebar/ADD_SIDEBAR_NAVLINK`:
            let newLink = {
                id: state.navigationLinks.length + 1,
                name: action.title,
                path: action.path
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
        default:
            return state
    }
}

type ActionsType = InferActionTypes<typeof actions>

export const actions = {
    addSideBarNavLink: (title: string, path: string) => ({ type: `sn/sidebar/ADD_SIDEBAR_NAVLINK`, title, path } as const),
    deleteSideBarNavLink: (id: number) => ({ type: `sn/sidebar/DELETE_SIDEBAR_NAVLINK`, id } as const)
}

export default reducerSidebar