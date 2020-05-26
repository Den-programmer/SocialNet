import Dialogs from './dialogs';
import { connect } from 'react-redux';
import { getDialogsData } from '../../../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        dialogsData: getDialogsData(state)
    }
} 

const DialogsContainer = connect(mapStateToProps, null)(Dialogs);

export default DialogsContainer;