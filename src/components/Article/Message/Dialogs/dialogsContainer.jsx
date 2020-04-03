import Dialogs from './dialogs';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        dialogsData:state.messagesPage.dialogsData,
    }
} 
let mapDispatchToProps = (dispatch) => {
    return {}
} 

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;