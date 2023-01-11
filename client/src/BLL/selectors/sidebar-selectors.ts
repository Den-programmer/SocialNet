import { RootState } from "../redux";

export const getSideBarNavLinks = (state: RootState) => {
    return state.Sidebar.navigationLinks;
}

export const getIsSidebarOpenStatus = (state: RootState) => {
    return state.Sidebar.isSidebarOpen
}

export const getSidebarWidth = (state: RootState) => {
    return state.Sidebar.sidebarWidth
}