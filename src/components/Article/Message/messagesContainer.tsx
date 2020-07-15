import React from 'react'
import Messages from "./message"
import { connect } from 'react-redux'
import { withAuthRedirect } from "../../../HOC/withAuthRedirect"
import { compose } from "redux"
import { RootState } from '../../../BLL/redux'
// import { getDialogs } from '../../../BLL/reducer-messages'

const mapStateToProps = (state: RootState) => ({})

interface MessagesContainerPropsType {}

class MessagesContainer extends React.Component<MessagesContainerPropsType> {
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
)(MessagesContainer)