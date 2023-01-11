import React from 'react'
import Messages from "./message"
import { connect } from 'react-redux'
import { withAuthRedirect } from "../../../HOC/withAuthRedirect"
import { compose } from "redux"
import { RootState } from '../../../BLL/redux'
import { getIsUserProfileMenuOpenStatus } from '../../../BLL/selectors/messages-selectors'

const mapStateToProps = (state: RootState) => ({
    isUserProfileMenuOpen: getIsUserProfileMenuOpenStatus(state)
})

interface IMessagesContainer {
    isUserProfileMenuOpen: boolean
}

const MessagesContainer: React.FC<IMessagesContainer> = (props) => {
    return <Messages isUserProfileMenuOpen={props.isUserProfileMenuOpen}/>
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {  }),
    withAuthRedirect
)(MessagesContainer)