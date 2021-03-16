import Dialogs from './dialogs'
import { connect } from 'react-redux'
import { getDialogsData, getMessagesTrim, getUserDialogId } from '../../../../BLL/selectors/messages-selectors'
import { RootState } from '../../../../BLL/redux'
import { actions, getDialogMessages } from '../../../../BLL/reducer-messages'

const mapStateToProps = (state: RootState) => ({
    dialogsData: getDialogsData(state),
    userDialogId: getUserDialogId(state),
    trim: getMessagesTrim(state)
}) 

const { setUserDialogId, setUserActiveStatus, setMessagesTrim } = actions

const DialogsContainer = connect(mapStateToProps, { setUserDialogId, getDialogMessages, setUserActiveStatus, setMessagesTrim })(Dialogs)

export default DialogsContainer