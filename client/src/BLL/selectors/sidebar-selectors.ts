import { RootState } from "../redux"

export const selectSideBarNavLinks = (state: RootState) => {
    return state.Sidebar.navigationLinks
}

export const selectIsSidebarOpenStatus = (state: RootState) => {
    return state.Sidebar.isSidebarOpen
}

export const selectSidebarWidth = (state: RootState) => {
    return state.Sidebar.sidebarWidth
}