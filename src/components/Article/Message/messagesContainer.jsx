import React from 'react';
import Messages from "./message";
import { connect } from 'react-redux';
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { compose } from "redux";
// import { getDialogs } from '../../../BLL/reducer-messages';

let mapStateToProps = (state) => {
    return {

    }
}
class MessagesContainer extends React.Component {
    // componentDidMount() {
    //    this.props.getDialogs(); 
    // }
    render() {
        return (
            <Messages />
        );
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {  })
)(MessagesContainer);