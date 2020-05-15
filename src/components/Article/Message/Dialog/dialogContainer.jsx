import Dialog from './dialog';
import { addMessage } from '../../../../BLL/reducer-messages';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        messages:state.messagesPage.messages,
    }
}

const DialogContainer = connect(mapStateToProps, { addMessage })(Dialog);

export default DialogContainer;