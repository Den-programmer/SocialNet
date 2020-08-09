import React from 'react'
import Messages from "./message"
import { connect } from 'react-redux'
import { withAuthRedirect } from "../../../HOC/withAuthRedirect"
import { compose } from "redux"
import { RootState } from '../../../BLL/redux'
import { getALLDialogs } from '../../../BLL/reducer-messages'

const mapStateToProps = (state: RootState) => ({})

interface MessagesContainerPropsType {
    getALLDialogs: () => void
}

class MessagesContainer extends React.Component<MessagesContainerPropsType> {
    componentDidMount() {
       this.props.getALLDialogs()
    }
    componentDidUpdate() {
        this.props.getALLDialogs()
    }
    render() {
        return (
            <Messages />
        )
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getALLDialogs  })
)(MessagesContainer)