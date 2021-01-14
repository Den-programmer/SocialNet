import { RootState } from '../../BLL/redux'
import { connect } from "react-redux"
import Footer from "./Footer"
import { getFootLinks, getYear, getFootInf } from "../../BLL/selectors/footer-selectors"
import { getSidebarWidth, getIsSidebarOpenStatus } from '../../BLL/selectors/sidebar-selectors'

const mapStatetoProps = (state: RootState) => ({
    footLinks:getFootLinks(state),
    year:getYear(state),
    footInf:getFootInf(state),
    drawerWidth: getSidebarWidth(state),
    isSidebarOpen: getIsSidebarOpenStatus(state)
})

const Footercontainer = connect(mapStatetoProps, {})(Footer)

export default Footercontainer