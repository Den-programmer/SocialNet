import { RootState } from '../../BLL/redux';
import { connect } from "react-redux";
import Footer from "./Footer";
import { getFootLinks, getYear, getFootInf } from "../../BLL/selectors/selectors";

let mapStatetoProps = (state: RootState) => ({
    footLinks:getFootLinks(state),
    year:getYear(state),
    footInf:getFootInf(state),
})

const Footercontainer = connect(mapStatetoProps, null)(Footer)

export default Footercontainer;