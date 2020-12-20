import Dialogs from './dialogs'
import { connect } from 'react-redux'
import { getDialogsData, getUserDialogId } from '../../../../BLL/selectors/messages-selectors'
import { RootState } from '../../../../BLL/redux'
import { actions, getDialogMessages } from '../../../../BLL/reducer-messages'

const mapStateToProps = (state: RootState) => ({
    dialogsData: getDialogsData(state),
    userDialogId: getUserDialogId(state)
}) 

const { setUserDialogId, setUserActiveStatus } = actions

const DialogsContainer = connect(mapStateToProps, { setUserDialogId, getDialogMessages, setUserActiveStatus })(Dialogs)

export default DialogsContainer