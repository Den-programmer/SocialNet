import React, { useEffect } from 'react'
import Messages from "./message"
import { connect } from 'react-redux'
import { withAuthRedirect } from "../../../HOC/withAuthRedirect"
import { compose } from "redux"
import { RootState } from '../../../BLL/redux'
import { getALLDialogs } from '../../../BLL/reducer-messages'
import { getIsUserProfileMenuOpenStatus } from '../../../BLL/selectors/messages-selectors'

const mapStateToProps = (state: RootState) => ({
    isUserProfileMenuOpen: getIsUserProfileMenuOpenStatus(state)
})

interface IMessagesContainer {
    isUserProfileMenuOpen: boolean
    getALLDialogs: () => void
}

const MessagesContainer: React.FC<IMessagesContainer> = (props) => {
    useEffect(() => {
        props.getALLDialogs()
    })

    return <Messages isUserProfileMenuOpen={props.isUserProfileMenuOpen}/>
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getALLDialogs }),
    withAuthRedirect
)(MessagesContainer)