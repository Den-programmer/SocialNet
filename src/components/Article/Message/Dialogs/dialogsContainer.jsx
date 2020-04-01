import React from 'react';
import Dialogs from './dialogs';
import storeContext from '../../../../storeContext';

const DialogsContainer = (props) => {
    return (
        <storeContext.Consumer> 
        {
            (store) => {
                let state = store.getState();
                return <Dialogs dialogsData={state.messagesPage.dialogsData}/>
            }
}
        </storeContext.Consumer>
    );
}

export default DialogsContainer;