import Dialog from './dialog'
import { actions, sendMessage } from '../../../../BLL/reducer-messages'
import { connect } from 'react-redux'
import { getMessages, getDialogsData, getIsUserProfileMenuOpenStatus, getUserDialogId } from '../../../../BLL/selectors/messages-selectors'
import { RootState } from '../../../../BLL/redux'

const { setUserProfileMenuStatus } = actions

const mapStateToProps = (state: RootState) => ({
    messages:getMessages(state),
    dialogsData: getDialogsData(state),
    isUserProfileMenuOpen: getIsUserProfileMenuOpenStatus(state),
    userDialogId: getUserDialogId(state)
})

const DialogContainer = connect(mapStateToProps, { setUserProfileMenuStatus, sendMessage })(Dialog)

export default DialogContainer