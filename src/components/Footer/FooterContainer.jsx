import { connect } from "react-redux";
import Footer from "./Footer";

let mapStatetoProps = (state) => {
    return {
        footLinks:state.Footer.footLinks,
        year:state.Footer.year,
        footInf:state.Footer.footInf,
    }
}

const Footercontainer = connect(mapStatetoProps, null)(Footer)

export default Footercontainer;