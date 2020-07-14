import { connect } from 'react-redux'
import SideBar from './SideBar'
import { getSideBarNavLinks } from '../../BLL/selectors/sidebar-selectors'
import { RootState } from '../../BLL/redux'

let mapStateToProps = (state: RootState) => ({
    navLinks: getSideBarNavLinks(state)
})

const SideBarContainer = connect(mapStateToProps, {  })(SideBar)

export default SideBarContainer