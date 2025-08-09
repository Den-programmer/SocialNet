import React from 'react'
import SideBar from './SideBar'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {
    selectSideBarNavLinks,
    selectIsSidebarOpenStatus,
    selectSidebarWidth,
} from '../../BLL/selectors/sidebar-selectors'
import { sidebarActions } from '../../BLL/reducer-sidebar'
import { profileActions } from '../../BLL/reducer-profile'

const SideBarContainer: React.FC = () => {
    const dispatch = useAppDispatch()

    const navLinks = useAppSelector(selectSideBarNavLinks)
    const isSidebarOpen = useAppSelector(selectIsSidebarOpenStatus)
    const sidebarWidth = useAppSelector(selectSidebarWidth)

    const { changeSidebarIsOpenStatus, choosePage } = sidebarActions
    const { changeProfileNavItemChosenStatus } = profileActions

    return (
        <SideBar
            navLinks={navLinks}
            isSidebarOpen={isSidebarOpen}
            sidebarWidth={sidebarWidth}
            changeSidebarIsOpenStatus={(status) => dispatch(changeSidebarIsOpenStatus(status))}
            choosePage={(page) => dispatch(choosePage(page))}
            changeProfileNavItemChosenStatus={(status) => dispatch(changeProfileNavItemChosenStatus(status))}
        />
    )
}

export default SideBarContainer