import Dialog from './dialog'
import { actions } from '../../../../BLL/reducer-messages'
import { connect } from 'react-redux'
import { getMessages, getDialogsData, getIsUserProfileMenuOpenStatus } from '../../../../BLL/selectors/messages-selectors'
import { RootState } from '../../../../BLL/redux'

const { setUserProfileMenuStatus, addMessage } = actions

const mapStateToProps = (state: RootState) => ({
    messages:getMessages(state),
    dialogsData: getDialogsData(state),
    isUserProfileMenuOpen: getIsUserProfileMenuOpenStatus(state) 
})

const DialogContainer = connect(mapStateToProps, { addMessage, setUserProfileMenuStatus })(Dialog)

export default DialogContainer