import { connect } from 'react-redux'
import SideBar from './SideBar'
import { getSideBarNavLinks, getIsSidebarOpenStatus, getSidebarWidth } from '../../BLL/selectors/sidebar-selectors'
import { RootState } from '../../BLL/redux'
import { actions } from '../../BLL/reducer-sidebar'

const { changeSidebarIsOpenStatus, choosePage } = actions

const mapStateToProps = (state: RootState) => ({
    navLinks: getSideBarNavLinks(state),
    isSidebarOpen: getIsSidebarOpenStatus(state),
    sidebarWidth: getSidebarWidth(state)
})

const SideBarContainer = connect(mapStateToProps, { changeSidebarIsOpenStatus, choosePage })(SideBar)

export default SideBarContainer