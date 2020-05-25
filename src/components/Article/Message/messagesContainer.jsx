import Messages from "./message";
import { connect } from 'react-redux';
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { compose } from "redux";

export default compose(
    // withAuthRedirect,
    connect(null, null)
)(Messages);