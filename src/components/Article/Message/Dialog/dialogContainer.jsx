import Dialog from './dialog';
import { addMessage } from '../../../../BLL/reducer-messages';
import { connect } from 'react-redux';
import { getMessages } from '../../../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        messages:getMessages(state),
    }
}

const DialogContainer = connect(mapStateToProps, { addMessage })(Dialog);

export default DialogContainer;