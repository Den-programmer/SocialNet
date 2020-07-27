import { RootState } from '../../BLL/redux'
import { connect } from "react-redux"
import Footer from "./Footer"
import { getFootLinks, getYear, getFootInf } from "../../BLL/selectors/footer-selectors"

let mapStatetoProps = (state: RootState) => ({
    footLinks:getFootLinks(state),
    year:getYear(state),
    footInf:getFootInf(state)
})

const Footercontainer = connect(mapStatetoProps, {})(Footer)

export default Footercontainer