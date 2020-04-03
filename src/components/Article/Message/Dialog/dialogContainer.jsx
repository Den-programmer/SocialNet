import Dialog from './dialog';
import { addMessageActionCreator } from '../../../../BLL/reducer-messages';
import { onNewMessageChangeActionCreator } from '../../../../BLL/reducer-messages';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        messages:state.messagesPage.messages,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageVal) => {
            dispatch(addMessageActionCreator(newMessageVal));
        },
        onNewMessageChange: (newMessageValue) => {
            dispatch(onNewMessageChangeActionCreator(newMessageValue));
        }
    }
}

const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);

export default DialogContainer;