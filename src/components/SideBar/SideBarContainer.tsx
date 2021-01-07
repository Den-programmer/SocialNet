import { connect } from 'react-redux'
import SideBar from './SideBar'
import { getSideBarNavLinks, getIsSidebarOpenStatus, getSidebarWidth } from '../../BLL/selectors/sidebar-selectors'
import { RootState } from '../../BLL/redux'
import { actions } from '../../BLL/reducer-sidebar'
import { actions as actions2 } from '../../BLL/reducer-profile'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

const { changeSidebarIsOpenStatus, choosePage } = actions
const { changeProfileNavItemChosenStatus } = actions2

const mapStateToProps = (state: RootState) => ({
    navLinks: getSideBarNavLinks(state),
    isSidebarOpen: getIsSidebarOpenStatus(state),
    sidebarWidth: getSidebarWidth(state)
})

const SideBarContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { changeSidebarIsOpenStatus, choosePage, changeProfileNavItemChosenStatus })
)(SideBar)

export default SideBarContainer