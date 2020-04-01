import React from 'react';
import Dialog from './dialog';
import { addMessageActionCreator } from '../../../../BLL/reducer-messages';
import { onNewMessageChangeActionCreator } from '../../../../BLL/reducer-messages';
import storeContext from '../../../../storeContext';

const DialogContainer = (props) => {
    return (
        <storeContext.Consumer>
            {(store) => {

                let addMessage = (newMessageVal) => {
                    store.dispatch(addMessageActionCreator(newMessageVal));
                }
                let onNewMessageChange = (newMessageValue) => {
                    store.dispatch(onNewMessageChangeActionCreator(newMessageValue));
                }

                let state = store.getState();
                
                return <Dialog messagesPage={state.messagesPage}
                    onNewMessageChange={onNewMessageChange}
                    addMessage={addMessage}
                    messages={state.messagesPage.messages} />
            }
            }
        </storeContext.Consumer>
    );
}

export default DialogContainer;