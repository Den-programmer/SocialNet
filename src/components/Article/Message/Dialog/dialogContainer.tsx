import Dialog from './dialog'
import { addMessage } from '../../../../BLL/reducer-messages'
import { connect } from 'react-redux'
import { getMessages } from '../../../../BLL/selectors/messages-selectors'
import { RootState } from '../../../../BLL/redux'

let mapStateToProps = (state: RootState) => ({
    messages:getMessages(state)
})

const DialogContainer = connect(mapStateToProps, { addMessage })(Dialog)

export default DialogContainer