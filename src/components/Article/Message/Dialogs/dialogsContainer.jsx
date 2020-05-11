import Dialogs from './dialogs';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        dialogsData:state.messagesPage.dialogsData
    }
} 

const DialogsContainer = connect(mapStateToProps, null)(Dialogs);

export default DialogsContainer;