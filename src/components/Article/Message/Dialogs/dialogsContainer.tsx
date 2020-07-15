import Dialogs from './dialogs'
import { connect } from 'react-redux'
import { getDialogsData } from '../../../../BLL/selectors/messages-selectors'
import { RootState } from '../../../../BLL/redux'

let mapStateToProps = (state: RootState) => ({
    dialogsData: getDialogsData(state)
}) 

const DialogsContainer = connect(mapStateToProps, {})(Dialogs)

export default DialogsContainer