import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../BLL/reducer-auth'
import { RootState } from '../../BLL/redux'
import { getLoginName, getIsAuthStatus } from '../../BLL/selectors/auth-selectors'
import { getIsSidebarOpenStatus, getSidebarWidth } from '../../BLL/selectors/sidebar-selectors'
import { actions } from '../../BLL/reducer-sidebar'
import { actions as actions2 } from '../../BLL/reducer-auth'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

const { changeSidebarIsOpenStatus } = actions
const { setLastUrl } = actions2

const mapStateToProps = (state: RootState) => ({
    loginName: getLoginName(state),
    isAuth: getIsAuthStatus(state),
    isSidebarOpen: getIsSidebarOpenStatus(state),
    drawerWidth: getSidebarWidth(state)
})

const HeaderContainer = compose<React.ComponentType>(
    connect(mapStateToProps, { logout, changeSidebarIsOpenStatus, setLastUrl }),
    withRouter
)(Header)

export default HeaderContainer