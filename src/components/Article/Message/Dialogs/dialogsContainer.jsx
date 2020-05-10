import Dialogs from './dialogs';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        dialogsData:state.messagesPage.dialogsData,
        isAuth:state.auth.isAuth,
    }
} 

const DialogsContainer = connect(mapStateToProps, null)(Dialogs);

export default DialogsContainer;