import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../BLL/reducer-auth'
import { RootState } from '../../BLL/redux'
import { getLoginName, getIsAuthStatus } from '../../BLL/selectors/auth-selectors'
import { getIsSidebarOpenStatus, getSidebarWidth } from '../../BLL/selectors/sidebar-selectors'
import { actions } from '../../BLL/reducer-sidebar'

const { changeSidebarIsOpenStatus } = actions

const mapStateToProps = (state: RootState) => ({
    loginName: getLoginName(state),
    isAuth: getIsAuthStatus(state),
    isSidebarOpen: getIsSidebarOpenStatus(state),
    drawerWidth: getSidebarWidth(state)
})

const HeaderContainer = connect(mapStateToProps, { logout, changeSidebarIsOpenStatus })(Header)

export default HeaderContainer