import Dialog from './dialog';
import { addMessage } from '../../../../BLL/reducer-messages';
import { onNewMessageChange } from '../../../../BLL/reducer-messages';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        messages:state.messagesPage.messages,
    }
}

const DialogContainer = connect(mapStateToProps, { addMessage: addMessage,onNewMessageChange: onNewMessageChange })(Dialog);

export default DialogContainer;