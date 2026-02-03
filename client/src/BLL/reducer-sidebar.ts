import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { navLinkType } from '../types/SidebarTypes/sidebarTypes'

type SidebarState = {
  navigationLinks: Array<Omit<navLinkType, 'icon'> & { iconKey: string }>
  isSidebarOpen: boolean
  sidebarWidth: number
}

const initialState: SidebarState = {
  navigationLinks: [
    { id: 7001, name: 'Profile', path: '/Profile', iconKey: 'UserOutlined', isChosen: true },
    { id: 7002, name: 'Messages', path: '/Messages', iconKey: 'MailOutlined', isChosen: false },
    { id: 7006, name: 'Friends', path: '/Friends/DataFriends', iconKey: 'TeamOutlined', isChosen: false },
    { id: 7013, name: 'Notifications', path: '/Notifications', iconKey: 'NotificationOutlined', isChosen: false },
    { id: 7003, name: 'News', path: '/News', iconKey: 'BellOutlined', isChosen: false },
    { id: 7015, name: 'Options', path: '/Options/account', iconKey: 'SettingOutlined', isChosen: false },
    { id: 7010, name: 'AI', path: '/AIPage', iconKey: 'GlobalOutlined', isChosen: false }
  ],
  isSidebarOpen: false,
  sidebarWidth: 240
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    addSideBarNavLink: (state, action: PayloadAction<{ title: string, path: string, iconKey: string }>) => {
      const newLink: navLinkType = {
        id: state.navigationLinks.length + 1,
        name: action.payload.title,
        path: action.payload.path,
        iconKey: action.payload.iconKey,
        isChosen: false
      }
      state.navigationLinks.push(newLink)
    },
    deleteSideBarNavLink: (state, action: PayloadAction<number>) => {
      state.navigationLinks = state.navigationLinks.filter(link => link.id !== action.payload)
    },
    changeSidebarIsOpenStatus: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload
    },
    choosePage: (state, action: PayloadAction<number>) => {
      state.navigationLinks = state.navigationLinks.map(link => ({
        ...link,
        isChosen: link.id === action.payload
      }))
    }
  }
})

export const sidebarActions = sidebarSlice.actions

export default sidebarSlice.reducer